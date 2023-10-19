const Posts = require('../../model/post')
const multer = require('multer')
const path = require("path")


const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb( null, path.join(__dirname, '../../public/images'));
  },
  filename: function(req, file, cb){
    cb( null, Date.now() + '_' + file.originalname);
  },
})


const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
}).single('images');

const getAllPosts = async (req, res) => {
    const allPosts = await Posts.find()
    res.json(allPosts)
}

const updatePost = async (req, res) => {
    if (!req.params.id) return res.sendStatus(400)

    const { title, text } = req.body
    const editedPost = {
        title,
        text,
        image: req.body.image
    }

    try {
        const foundPost = await Posts.findByIdAndUpdate(req.params.id, editedPost, {new: true})
        res.json({message: 'Post updated successfully'})
    } catch (error) {
        console.log(error);
    }
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

const likePost = async (req, res) => {
    const postId = req.params.id
    const username = req.body
    try {
        const postToLike = await Posts.findOne({ _id: postId }).exec()
        console.log(postToLike, 1);
        if (!postToLike) return res.status(400).json({ message: 'Post not found' })
        postToLike.likeCount.count += 1
        postToLike.likeCount.postId = postId
        postToLike.likeCount.username = username
        await postToLike.save()
        res.json(postToLike)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAllPosts, updatePost, deletePost, getPost, upload, likePost}