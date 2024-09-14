const express = require('express')
const router = express.Router()
const Users = require('../model/users')
const Posts = require('../model/post')

router.get('/', async function(req, res) {
    const getAllUsers = await Users.find()
    res.json(getAllUsers)
})

router.get('/', async function(req, res) {
    const getAllPosts = await Posts.find()
    res.json(getAllPosts)
})


module.exports = router