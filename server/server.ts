import express from 'express'
import axios, { AxiosRequestConfig } from 'axios'
import _ from 'lodash'

const app = express()

const port = 4000

const get = _.memoize(axios.get)

// path for all api routes
app.get('/api', async (req, res) => {
    const example = await get(
        'https://api.github.com/search/repositories?page=3&per_page=100',
        {
            params: {
                q: 'well hello there',
            },
        }
    )
    res.send(example.data)
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
