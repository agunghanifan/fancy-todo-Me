const {Todo, Account} = require("../models")
const axios = require("axios")

class TodosController {
    static showTodo(req, res, next) {
        Todo.findAll({where : {AccountId : Number(req.user.id)}})
            .then((data) => {
                if(data) {
                    res.status(200).json(data)
                } else {
                    next({code: 404, message: "Todo List Not Found"})
                }
            })
            .catch(err => {
                next({code: 500, message: "Internal Server Error"})
            })
    }

    static addTodo(req, res, next) {
        let year = new Date(req.body.due_date).getFullYear()
        let apiKey = process.env.API_KEY
        axios({
            method: "GET",
            url: `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=ID&year=${year}`
        })
            .then((response) => {
                let body = {
                    title: req.body.title,
                    description: req.body.description,
                    due_date: req.body.due_date,
                    AccountId: req.user.id
                }
                if(body.description[body.description.length - 1] != ".") {
                    body.description += "."
                }
                response.data.response.holidays.forEach(data => {
                    if(body.due_date == data.date.iso) {
                        body.description += ` Tanggal ini bertepatan dengan ${data.name}. berikut penjelasannya = ${data.description}.`
                    }
                })
                if(body.description == req.body.description + ".") {
                    body.description += ` Tidak ada event special Calendar.`
                }
                return Todo.create(body)

            })
            .then((data) => {
                res.status(201).json(data)
            })
            .catch((err) => {
                let errors = []
                if(err) {
                    err.errors.forEach((error) => {
                        errors.push(error.message)
                    })
                    next({code: 400, message: errors})
                } else {
                    next({code: 500, message: "Internal Server Error"})
                }
            })
    }

    static showEditTodo(req, res, next) {
        let idKey = Number(req.params.id)
        Todo.findByPk(idKey)
            .then((data) => {
                if(data) {
                    res.status(200).json(data)
                } else {
                    next({code:404, message: "Todo Not Found"})
                }
            })
            .catch(err => {
                let errors = []
                if(err) {
                    next({code:404, message: errors})
                } else {
                    next({code:500, message: "Internal Server Error"})
                }
            })
    }

    static submitEditTodo(req, res, next) {
        let year = new Date(req.body.due_date).getFullYear()
        let apiKey = process.env.API_KEY
        let result
        axios({
            method: "GET",
            url: `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=ID&year=${year}`
        })
            .then((response) => {
                let body = {
                    title: req.body.title,
                    description: req.body.description,
                    due_date: req.body.due_date,
                    AccountId: req.user.id
                }
                response.data.response.holidays.forEach(data => {
                    if(body.due_date == data.date.iso) {
                        body.description += `. Tanggal ini bertepatan dengan ${data.name}. berikut penjelasannya = ${data.description}. `
                    }
                })
                if(body.description == req.body.description) {
                    body.description += `. Tidak ada event special Calendar`
                }
                result = body
                return Todo.update(body, {where: {
                    id: Number(req.params.id)
                }})
            })

            .then((data) => {
                console.log(data[0])
                if(data[0] === 1) {
                    res.status(200).json(result)
                } else {
                    next({code:404, message: "Todo Not Found"})
                }
            })
            .catch((err) => {
                let errors = []
                if(err !== undefined) {
                    err.errors.forEach((error) => {
                        errors.push(error.message)
                    })
                    next({code:404, message: errors})
                } else {
                    next({code:500, message: "Internal Server Error"})
                }
            })
    }

    static checkedTodo(req, res, next) {
        let checked = {
            status : "closed"
        }
        Todo.update(checked, {where : {id : Number(req.params.id)}})
            .then((data) => {
                if(data[0] !== 0) {
                    return Todo.findByPk(Number(req.params.id))
                } else {
                    next({code:404, message: "Todo Not Found"})
                }
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                let errors = []
                if(err) {
                    next({code:404, message: errors})
                } else {
                    next({code:500, message: "Internal Server Error"})
                }
            })
    }

    static deleteTodo(req, res, next) {
        Todo.destroy({where : {id : Number(req.params.id)}})
            .then((data) => {
                if(data) {
                    res.status(200).json("todo successfully deleted")
                } else {
                    next({code:404, message: "Todo Not Found"})
                }
            })
            .catch((err) => {
                next({code:500, message: "Internal Server Error"})
            })
    }
}

module.exports = TodosController