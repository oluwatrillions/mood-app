const express = require('express')
const router = express.Router()
const PostController = require('../../../controllers/posts/posts')
const { upload } = require('../../../controllers/posts/posts')

router.get('/', PostController.getAllPosts)
router.put('/:id', upload, PostController.updatePost)
router.delete('/:id', PostController.deletePost)
router.get('/:id', PostController.getPost)
router.post('/like/:id', PostController.likePost)
router.post('/comment/:id', PostController.userComment)


module.exports = router