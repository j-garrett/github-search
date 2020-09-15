import express from 'express'
import axios from 'axios'
import url from 'url'
import _ from 'lodash'

const app = express()

const port = 4000

const cache: { [query: string]: any } = {}

interface QueryObject {
    description?: string
    language?: string
    name?: string
    default?: string
}

app.get('/api', async (req, res) => {
    const query: QueryObject = req.query
    // Should do more validation here for user input
    if (query) {
        const stringified = Object.values(query).join('-')
        const cached = cache[stringified]
        if (cached && Date.now() - cached.time < 1000 * 60 * 60) {
            res.send(cached.data)
        } else {
            try {
                let formattedQuery
                if (query.default) {
                    formattedQuery = query.default
                } else {
                    formattedQuery = `${query.name}+in:name+language:${query.language}+${query.description}+in:description`
                }
                const gitRes = await axios.get(
                    'https://api.github.com/search/repositories',
                    {
                        params: {
                            q: formattedQuery,
                        },
                    }
                )
                cache[stringified] = {
                    data: gitRes.data,
                    time: Date.now(),
                }

                res.send(gitRes.data)
            } catch (e) {
                console.log('error: ', e)
                res.send(e)
            }
        }
    }
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
