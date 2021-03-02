const { Account, Todo } = require("../models")
const { hashPassword, comparePassword } = require('../helper/hash-password')
const { matchingToken, token } = require('../helper/jason-web-token')

class AccountController {
    static submitRegister(req, res, next) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }
        Account.create(newUser)
            .then(data => {
                if(data) {
                    res.status(201).json(data)
                } else {
                    throw new Error()
                }
            })
            .catch(err => {
                let errors = []
                if(err) {
                    err.errors.forEach((error) => {
                        errors.push(error.message)
                    })
                    // res.status(400).json(errors)
                    next({code: 400, message: errors})
                } else {
                    // res.status(500).json({message: "Internal Server Error"})
                    next({code: 500, message: "Internal Server Error"})
                }
            })
    }

    static submitLogin(req, res, next) {
        let body = {
            email: req.body.email,
            password: req.body.password
        }
        Account.findOne({where : {email : body.email}})
            .then(data => {
                const isValid = comparePassword(body.password, data.password)
                if(isValid) {
                    let session = token(data.id, data.email)
                    res.status(200).json({id : data.id, email: data.email, session})
                } else {
                    throw { msg: "Invalid username / password"}
                }
            })
            .catch(err => {
                if(err) {
                    // res.status(400).json({message: err.msg})
                    next({code: 400, message: err.msg})
                } else {
                    // res.status(500).json({message: "Internal Server Error"})
                    next({code: 500, message: "Internal Server Error"})
                }
            })
    }
}

module.exports = AccountController