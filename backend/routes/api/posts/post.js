const express = require('express')
const router = express.Router()
const { createPost, upload } = require('../../../controllers/posts/post')

router.post('/', upload, createPost)

module.exports = router