const { Account, Todo } = require("../models")
const { hashPassword, comparePassword } = require('../helper/hash-password')
const { matchingToken, token } = require('../helper/jason-web-token')

class AccountController {
    static submitRegister(req, res, next) {
        try {
            
        } catch (error) {
            
        }
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }
        Account.create(newUser)
            .then(data => {
                // console.log("masuk sini 1")
                if(data) {
                    // console.log("masuk sini 2")
                    res.status(201).json(data)
                } else {
                    // console.log("masuk sini 3")
                    throw new Error()
                }
            })
            .catch(err => {
                let errors = []
                if(err.errors.length > 0) {
                    err.errors.forEach((error) => {
                        errors.push(error.message)
                    })
                    next({code: 400, message: errors})
                } else if (err) {
                    errors.push(err.message)
                    next({code: 400, message: errors})
                    // console.log("masuk sini 6")
                } else {
                    next({code: 500, message: "Internal Server Error"})
                }
            })
    }

    static submitLogin(req, res, next) {
        try {
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
                        next ({code: 401, message: "Invalid username / password"})
                    }
                })
                .catch(err => {
                    next({code: 400, message: "Username / password wajib diisi"})
                })
            } catch (error) {
                next({code: 500, message: "Internal Server Error"})
            
        }
    }
}
module.exports = AccountController