const express = require('express')
const router = express.Router()
const createPost = require('../../../controllers/posts/post')

router.post('/', createPost)

module.exports = router