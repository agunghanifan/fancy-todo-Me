const { matchingToken } = require('../helper/jason-web-token')
const { Account, Todo } = require('../models')
const {} = require("../routes")


const authenticate = (req, res, next) => {
  try {
    // console.log(req.headers.token || "tidak ditemukan token dari headers")
    let decoded = matchingToken(req.headers.token)
    // console.log(decoded, "ini decoded<<<<<<<<<<")
    Account.findOne({ where: { id: Number(decoded.id) } })
      .then((user) => {
        if (user) {
          req.user = { id: user.id, email: user.email }
          // console.log("masuk req.user", req.user)
          next()
        } else {
          next({code: 401, message: 'Unauthorized User'})
        }
      })

  } catch (error) {
    // console.log("masuk authenticate error")
    next({ code: 500, message: 'internal server error'})
  }
}

const authorization = (req, res, next) => {
  // console.log("masuk authorization")
  Todo.findOne({ where: { id: Number(req.params.id) } })
    .then((data) => {
      // console.log(req.user, "masuk authorization then  ")
      if (req.user.id == data.AccountId) {
        next()
      } else {
        next({ code: 401, message: 'Unauthorized User' })
      }
    })
    .catch((err) => {
      // console.log(req.user, "masuk authorization catch ")
      next({ code: 404, message: 'Todo Not Found' })
    })
}


module.exports = {
  authenticate,
  authorization,
}
