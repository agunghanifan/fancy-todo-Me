require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')

app.use(express.urlencoded({ extended: true}))
app.use(router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})