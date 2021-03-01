const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/account-controller')

router.get("/register", AccountController.register)
router.post("/register", AccountController.submitRegister)
router.get("/login", AccountController.login)
router.post("/login", AccountController.submitLogin)

module.exports = router
