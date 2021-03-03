if(process.env.NODE_ENV == "development") {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errors-handling')

app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})