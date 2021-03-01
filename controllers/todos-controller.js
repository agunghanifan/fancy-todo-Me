const {Todo, Account} = require("../models")

class TodosController {
    static showTodo(req, res) {
        Todo.findAll()
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(err => {
                let errors = []
                errors.push("Internal Server Error")
                res.status(500).json(errors)
            })
    }

    static addTodo(req, res) {
        let body = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
        }
        // console.log(body)
        Todo.create(body)
            .then((data) => {
                res.status(201).json(data)
            })
            .catch((err) => {
                let errors = []
                // console.log(err)
                if(err) {
                    err.errors.forEach((error) => {
                        errors.push(error.message)
                    })
                    res.status(400).json(errors)
                } else {
                    errors.push("Internal Server Error")
                    res.status(500).json(errors)
                }
            })
    }

    static showEditTodo(req, res) {
        let idKey = Number(req.params.id)
        Todo.findByPk(idKey)
            .then((data) => {
                if(data) {
                    res.status(200).json(data)
                } else {
                    throw new Error("Todo Not Found")
                }
            })
            .catch(err => {
                let errors = []
                if(err) {
                    errors.push(err.message)
                    res.status(404).json(errors)
                } else {
                    errors.push("Internal Server Error")
                    res.status(500).json(errors)
                }
            })
    }

    static submitEditTodo(req, res) {
        let body = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            status: req.body.status
        }
        console.log(body)
        console.log(req.params.id)
        Todo.update(body, {where: {
            id: Number(req.params.id)
        }})
            .then((data) => {
                if(data[0] !== 0) {
                    res.status(200).json(body)
                } else {
                    throw new Error("Todo Not Found")
                }
            })
            .catch((err) => {
                let errors = []
                // console.log(err)
                if(err.message === "Todo Not Found") {
                    errors.push(err.message)
                    res.status(404).json(errors)
                } else if(err) {
                    err.errors.forEach((error) => {
                        errors.push(error.message)
                    })
                    res.status(400).json(errors)
                } else {
                    errors.push("Internal Server Error")
                    res.status(500).json(errors)
                }
            })
    }

    static checkedTodo(req, res) {
        let checked = {
            status : "closed"
        }
        Todo.update(checked, {where : {id : Number(req.params.id)}})
            .then((data) => {
                if(data[0] !== 0) {
                    return Todo.findByPk(Number(req.params.id))
                } else {
                    throw new Error("Todo Not Found")
                }
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                let errors = []
                // console.log(err)
                if(err.message === "Todo Not Found") {
                    errors.push(err.message)
                    res.status(404).json(errors)
                } else if(err) {
                    err.errors.forEach((error) => {
                        errors.push(error.message)
                    })
                    res.status(400).json(errors)
                } else {
                    errors.push("Internal Server Error")
                    res.status(500).json(errors)
                }
            })
    }

    static deleteTodo(req, res) {
        Todo.destroy({where : {id : Number(req.params.id)}})
            .then((data) => {
                console.log(data)
                if(data) {
                    res.status(200).json("todo successfully deleted")
                } else {
                    throw new Error("Todo Not Found")
                }
            })
            .catch((err) => {
                let errors = []
                // console.log(err)
                if(err.message === "Todo Not Found") {
                    errors.push(err.message)
                    res.status(404).json(errors)
                } else {
                    errors.push("Internal Server Error")
                    res.status(500).json(errors)
                }
            })
    }
}

module.exports = TodosController