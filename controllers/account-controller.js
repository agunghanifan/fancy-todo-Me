const {Account, Todo} = require("../models")
const {hashPassword, comparePassword} = require('../helper/hash-password')
const token = require('../helper/jason-web-token')

class AccountController {
    static submitRegister(req, res) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(newUser)
        Account.create(newUser)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                let errors = []
                if(err) {
                    err.errors.forEach((error) => {
                        errors.push(error.message)
                    })
                    res.status(400).json(errors)
                } else {
                    // errors.push("Internal Server Error")
                    res.status(500).json({message: "Internal Server Error"})
                }
            })
    }

    static submitLogin(req, res) {
        let body = {
            email: req.body.email,
            password: req.body.password
        }
        Account.findOne({where : {email : body.email}})
            .then(data => {
                const isValid = comparePassword(body.password, data.password)
                if(isValid) {
                    let session = token(data)
                    res.status(200).json(session)
                } else {
                    throw { msg: "Invalid username / password"}
                }
            })
            .catch(err => {
                if(err) {
                    res.status(400).json({message: err.msg})
                } else {
                    res.status(500).json({message: "Internal Server Error"})
                }
            })
    }
}

module.exports = AccountController