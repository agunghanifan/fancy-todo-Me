const { Account } = require("../models")
const { comparePassword } = require('../helper/hash-password')
const { matchingToken, token } = require('../helper/jason-web-token')
const { OAuth2Client } = require('google-auth-library');


class AccountController {
  static submitRegister(req, res, next) {
    let newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    }
    // console.log(newUser)
    Account.create(newUser)
      .then(data => {
        // console.log("masuk sini 1")
        if (data) {
          // console.log("masuk sini 2")
          res.status(201).json(data)
        } else {
          // console.log("masuk sini 3")
          throw new Error()
        }
      })
      .catch(err => {
        let errors = []
        // console.log(err.errors)
        if (err.errors) {
          err.errors.forEach((error) => {
            errors.push(error.message)
          })
          next({ code: 400, message: errors })
        } else if (err.message) {
          errors.push(err.message)
          next({ code: 400, message: errors })
          // console.log("masuk sini 6")
        } else {
          next({ code: 500, message: "Internal Server Error" })
        }
      })
  }

  static submitLogin(req, res, next) {
    try {
      let body = {
        email: req.body.email,
        password: req.body.password
      }
      // console.log(body)
      Account.findOne({ where: { email: body.email } })
        .then(data => {
          const isValid = comparePassword(body.password, data.password)
          // console.log(isValid)
          if (isValid) {
            // console.log("masukvalid")
            let session = token(data.id, data.email, data.first_name)
            // console.log(session)
            res.status(200).json({ id: data.id, email: data.email, name: data.first_name, session })
          } else {
            // next({ code: 401, message: "Invalid username / password" })
            throw new Error()
          }
        })
        .catch(err => {
          if (!body.email || !body.password) {
            next({ code: 400, message: "Username / password wajib diisi" })
          } else {
            next({ code: 401, message: "Invalid username / password" })
          }
        })
    } catch (error) {
      next({ code: 500, message: "Internal Server Error" })

    }
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let email
    let first_name
    let last_name

    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        // console.log(payload, "ini payload<<<<<<<<<<<<")
        email = payload.email
        first_name = payload.given_name
        last_name = payload.family_name

        return Account.findOne({
          where: {
            email
          }
        })
      })
      .then(data => {
        // console.log(data)
        if (!data) {
          return Account.create({
            email,
            first_name,
            last_name,
            password: `${String(new Date())}/a@#${last_name}`
          })
        } else {
          return data
        }

      })
      .then(data => {
        // console.log("INI MASUK GOOGLE LOGIN DATA")
        // console.log(data.id)
        // console.log(data.email)
        let getToken = token(data.id, data.email)
        console.log(getToken)
        res.status(200).json({
          token: getToken,
          name: data.first_name
        })
      })
      .catch(err => {
        // console.log(err);
        next({ code: 500, message: "Internal Server Error" })
      })
  }
}

module.exports = AccountController