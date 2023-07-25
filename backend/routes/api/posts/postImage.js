const express = require('express')
const router = express.Router()
const getImage = require('../../../controllers/posts/getPostImageController')


router.get('/', getImage)

module.exports = router