const express = require('express')
const router = express.Router()
const TodosController = require('../controllers/todos-controller')
const { authenticate, authorization } = require('../middlewares/authorization')

router.get("/quotes", TodosController.generateQuotes)

router.use(authenticate)
//add todo
router.post("/", TodosController.addTodo)
//show todo
router.get("/", TodosController.showTodo)

//delete this, just for testing pair project
// router.get("/", TodosController.showNews)

//show edit todo
router.get("/:id", authorization, TodosController.showEditTodo)
//submit edit todo
router.put("/:id", authorization, TodosController.submitEditTodo)
//checked todo
router.patch("/:id", authorization, TodosController.checkedTodo)
//delete todo
router.delete("/:id", authorization, TodosController.deleteTodo)


module.exports = router