const express = require('express')
const router = express.Router()
const PostController = require('../../../controllers/posts/posts')

router.get('/', PostController.getAllPosts)
router.patch('/:id', PostController.updatePost)
router.delete('/:id', PostController.deletePost)
router.get('/:id', PostController.getPost)


module.exports = router