import express from 'express'
import axios, { AxiosRequestConfig } from 'axios'
import _ from 'lodash'

const app = express()

const port = 4000

// [TODO] Clear cache occasionally
const get = _.memoize(axios.get)

app.get('/api', async (req, res) => {
    try {
        const example = await get(
            'https://api.github.com/search/repositories',
            {
                params: {
                    q: req.query.query,
                },
            }
        )
        res.send(example.data)
    } catch (e) {
        console.log('error: ', e)
        res.send(e)
    }
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
