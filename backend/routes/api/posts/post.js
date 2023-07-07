const express = require('express')
const router = express.Router()
const { createPost, upload } = require('../../../controllers/posts/post')

router.post('/', upload.single('postImage'), createPost)

module.exports = router