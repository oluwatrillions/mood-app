const express = require('express')
const router = express.Router()
const likes = require('../../../controllers/likes/likes')

router.get('/', likes.likes)

module.exports = router