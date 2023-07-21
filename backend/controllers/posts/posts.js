const Posts = require('../../model/post')

const getAllPosts = async (req, res) => {
    const allPosts = await Posts.find()
    res.json(allPosts)
}

const updatePost = async (req, res) => {
    if (!req.params.id) return res.sendStatus(400)
    const foundPost = await Posts.findOne({ _id: req.params.id }).exec()
    
    if (!foundPost) {
        return res.status(401).json({ message: 'User not found' })
    } else {
        foundPost.title = req.body.title,
        foundPost.text = req.body.text,
        foundPost.image = req.body.image    
    }
    const editedPost = await foundPost.save()
    return res.status(201).json(editedPost, {message: 'Post updated successfully'})
}

const deletePost = async (req, res) => {
    if (!req.params.id) return res.sendStatus(400)
    const foundPost = await Posts.deleteOne({ _id: req.params.id })
    res.json({message: 'Post deleted successfully'})
}

const getPost = async (req, res) => {
    if (!req.params.id) return res.sendStatus(400)
    const foundPost = await Posts.findOne({ _id: req.params.id }).exec()
    if (!foundPost) return res.status(400).json({ message: 'Post does not exist' })
    res.json(foundPost)
}

module.exports = {getAllPosts, updatePost, deletePost, getPost}