const { Todo, Account } = require("../models")
const axios = require("axios")

class TodosController {
  static showTodo(req, res, next) {
    let dataDisplay
    Todo.findAll({ where: { AccountId: Number(req.user.id) }, 
      order: [
        ['id', 'ASC'],
      ], 
    })
      .then((data) => {
        if (data) {
          dataDisplay = data
          return dataDisplay

        } else {
          next({ code: 404, message: "Todo List Not Found" })
        }
      })
      .then((data) => {
        res.status(200).json({dataDisplay})
      })
      .catch(err => {
        next({ code: 500, message: "Internal Server Error" })
      })
  }

  static addTodo(req, res, next) {
    // console.log("masuk addtodo controller")
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
          event: null,
          AccountId: req.user.id
        }
        // console.log(body)
        if(body.due_date) {
          response.data.response.holidays.forEach(data => {
            if (body.due_date == data.date.iso) {
              if(!body.event) {
                body.event = `${data.name}@@${data.description}`
              } else {
                body.event += `--${data.name}@@${data.description}`
              }
            }
          })
        }
        return Todo.create(body)
      })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        // console.log(err)
        let errors = []
        if (err) {
          err.errors.forEach((error) => {
            errors.push(error.message)
          })
          next({ code: 400, message: errors })
        } else {
          next({ code: 500, message: "Internal Server Error" })
        }
      })
  }

  static showEditTodo(req, res, next) {
    let idKey = Number(req.params.id)
    Todo.findByPk(idKey)
      .then((data) => {
        if (data) {
          res.status(200).json(data)
        } else {
          next({ code: 404, message: "Todo Not Found" })
        }
      })
      .catch(err => {
        let errors = []
        if (err) {
          next({ code: 404, message: errors })
        } else {
          next({ code: 500, message: "Internal Server Error" })
        }
      })
  }

  static submitEditTodo(req, res, next) {
    // console.log(req.params.id)
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
          event: null,
          status: req.body.status,
          AccountId: req.user.id
        }
        // console.log(req.params.id, "ini reqparams id dari submit edit controller")
        response.data.response.holidays.forEach(data => {
          if (body.due_date == data.date.iso) {
            if(!body.event) {
              body.event = `${data.name}@@${data.description}`
            } else {
              body.event += `--${data.name}@@${data.description}`
            }
          }
        })
        return Todo.update(body, {
          where: {
            id: Number(req.params.id)
          }
        })
      })

      .then((data) => {
        // console.log(data[0])
        if (data[0] === 1) {
          res.status(200).json(data[0])
        } else {
          next({ code: 404, message: "Todo Not Found" })
        }
      })
      .catch((err) => {
        let errors = []
        if (err !== undefined) {
          err.errors.forEach((error) => {
            errors.push(error.message)
          })
          next({ code: 404, message: errors })
        } else {
          next({ code: 500, message: "Internal Server Error" })
        }
      })
  }

  static checkedTodo(req, res, next) {
    // console.log("masuk checklist todo controller")
    // console.log(req.params.id, "<<<<<<< ini params checkedlist")
    let checked = {
      status: "closed"
    }
    Todo.update(checked, { where: { id: Number(req.params.id) } })
      .then((data) => {
        if (data[0] !== 0) {
          return Todo.findByPk(Number(req.params.id))
        } else {
          next({ code: 404, message: "Todo Not Found" })
        }
      })
      .then((data) => {
        res.status(200).json("Success")
      })
      .catch((err) => {
        let errors = []
        if (err) {
          next({ code: 404, message: errors })
        } else {
          next({ code: 500, message: "Internal Server Error" })
        }
      })
  }

  static deleteTodo(req, res, next) {
    // console.log("masuk deletetodo")
    Todo.destroy({ where: { id: Number(req.params.id) } })
      .then((data) => {
        if (data) {
          res.status(200).json("todo successfully deleted")
        } else {
          next({ code: 404, message: "Todo Not Found" })
        }
      })
      .catch((err) => {
        next({ code: 500, message: "Internal Server Error" })
      })
  }

  static generateQuotes(req, res, next) {
    // setInterval(function(){
      axios({
        method: "GET",
        url: `https://api.quotable.io/random`
      })

        .then(response => {
          console.log(response.data, "ini dari controller")
          res.status(200).json(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    // }, 5000);
  }

}

module.exports = TodosController