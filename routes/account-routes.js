const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/account-controller')

router.post("/register", AccountController.submitRegister)
router.post("/login", AccountController.submitLogin)
router.post("/loginGoogle", AccountController.googleLogin)

module.exports = router
