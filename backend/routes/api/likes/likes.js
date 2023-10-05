const express = require('express')
const router = express.Router()
const likes = require('../../../controllers/likes/likes')

router.get('/', likes.getAllLikes)

router.get('/:id', likes.getLikesForPost)

module.exports = router