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
    const username = req.body.username
    try {
        const postToLike = await Posts.findOne({ _id: postId }).exec()
        if (!postToLike) return res.status(400).json({ message: 'Post not found' })

        const likeCheck = postToLike.likeCount.some((like) => like.username === username)
        if (likeCheck) return res.json({ message: 'User already liked post' })
        
        postToLike.likeCount.push({ postId, username })
        const numberOfLikes = [...new Set(postToLike.likeCount.map(post => post.username))]
        postToLike.count = numberOfLikes.length

        await postToLike.save()
        res.json(postToLike)
    } catch (error) {
        console.log(error);
    }
}

const userComment = async (req, res) => {
    const postId = req.params.id
    const username = req.body.username
    const comment = req.body.comment

    try {
        const commentByUser = await Posts.findOne({ _id: postId }).exec()
        if (!commentByUser) return res.json({message:'No comments with such id'})
        
        commentByUser.postId = postId
        commentByUser.username = username
        commentByUser.comment = comment

        await commentByUser.save()
        res.status(201).json(commentByUser)
        console.log(commentByUser);
    } catch (error) {
        console.log(error);
    }
}

const allComments = async (req, res) => {
    const postId = req.params.id
    const username = req.body.username
    const comment = req.body.comment

    try {
        const userComments = await Posts.findOne({ _id: postId }).exec()
        if (!userComments) return res.json({ message: 'No comments on this post' })
        
        userComments.comments.push({ postId, username, comment })

        userComments.commentCount = userComments.comments.length 

        await userComments.save()
        res.status(200).json({message: 'Comments added to post successfully'})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAllPosts, updatePost, deletePost, getPost, upload, likePost, userComment, allComments}