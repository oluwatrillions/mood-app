const express = require('express')
const router = express.Router()
const handleLogin = require('../../../controllers/loginController')
const verifyUser = require('../../../controllers/verifyLogin')

router.post('/', handleLogin, verifyUser)


module.exports = router