import express from 'express'
const app = express()
const port = 4000

// path for all api routes
app.get('/api', (req, res) => {
    res.send('Pretend this is an API response')
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
