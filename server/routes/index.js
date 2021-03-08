const express = require('express')
const router = express.Router()
const routerTodos = require("./todos-routes")
const routerAccount = require("./account-routes")


// router.get('/', (req, res) => {
//   res.status(200).send("Hello WOrld!")
// })

router.use("/todos", routerTodos)
router.use("/", routerAccount)


module.exports = router