const express = require('express')
const router = express.Router()
const TodosController = require('../controllers/todos-controller')

//add todo
router.post("/", TodosController.addTodo)
//show todo
router.get("/", TodosController.showTodo)
//show edit todo
router.get("/:id", TodosController.showEditTodo)
//submit edit todo
router.put("/:id", TodosController.submitEditTodo)
//checked todo
router.patch("/:id", TodosController.checkedTodo)
//delete todo
router.delete("/:id", TodosController.deleteTodo)

module.exports = router