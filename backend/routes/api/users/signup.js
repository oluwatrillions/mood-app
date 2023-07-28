const express = require('express')
const router = express.Router()
const {handleSignup} = require('../../../controllers/signupController')
const { upload } = require('../../../controllers/signupController')

router.post('/', upload, handleSignup)

module.exports = router