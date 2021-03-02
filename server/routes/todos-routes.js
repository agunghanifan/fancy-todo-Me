const express = require('express')
const router = express.Router()
const TodosController = require('../controllers/todos-controller')
const { authenticate, authorization } = require('../middlewares/authorization')

router.use(authenticate)
//add todo
router.post("/", TodosController.addTodo)
//show todo
router.get("/", TodosController.showTodo)


router.use("/:id", authorization)
//show edit todo
router.get("/:id",TodosController.showEditTodo)
//submit edit todo
router.put("/:id", TodosController.submitEditTodo)
//checked todo
router.patch("/:id", TodosController.checkedTodo)
//delete todo
router.delete("/:id", TodosController.deleteTodo)

module.exports = router