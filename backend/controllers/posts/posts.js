const Posts = require('../../model/post')
const users = require('../../model/users')
const Users = require('../../model/users')
const multer = require('multer')
const path = require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb( null, path.join(__dirname, '../../public/images'));
  },
    filename: function (req, file, cb) {
    cb( null, Date.now() + '_' + file.originalname);
    },  
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
    fileFilter: fileFilter
}).single('images');


// Get all the posts from current users
const getAllPosts = async (req, res) => {
    const allPosts = await Posts.find()
    const allUsers = await Users.find()    
    const filteredUsers = await allUsers.map(user => user.email)
    
    const filteredPosts = allPosts.filter(post => filteredUsers.includes(post.email))
    const unFilteredPosts = allPosts.filter(post => !filteredUsers.includes(post.email))    

    const unfiltered = await Posts.findOneAndRemove({email: unFilteredPosts.map(poster=>poster.email)})

    res.json(filteredPosts)
}

// Update or edit a post
const updatePost = async (req, res) => {
    if (!req.params.id) return res.sendStatus(400)            

    const { title, text } = req.body 
    
    const editedPost = {
            title,
            text,
            image: req.file ? req.file.filename : req.body.image
    };

    try {
        const foundPost = await Posts.findByIdAndUpdate(req.params.id, editedPost, { new: true })
        
        res.json({foundPost, message: 'Post updated successfully' })    
    } catch (error) {
        console.log(error);
    }
}

// Delete a post
const deletePost = async (req, res) => {
    if (!req.params.id) return res.sendStatus(400)
    const foundPost = await Posts.deleteOne({ _id: req.params.id })
    res.json({message: 'Post deleted successfully. Redirecting...'})
}

// Get a post by it's id
const getPost = async (req, res) => {
    if (!req.params.id) return res.sendStatus(400)
    const foundPost = await Posts.findOne({ _id: req.params.id }).exec()
    if (!foundPost) return res.status(400).json({ message: 'Post does not exist' })
    res.json(foundPost)
}

// Like a post
const likePost = async (req, res) => {
    const postId = req.params.id
    const username = req.body.username
    try {
        const postToLike = await Posts.findById({ _id: postId }).exec()
        if (!postToLike) return res.status(400).json({ message: 'Post not found' })

        const likeCheck = postToLike.likeCount.some((like) => like.username === username)

        if (likeCheck) {
            const numberOfLikes = [...new Set(postToLike.likeCount.map(post => post.username))]
            return res.json({
                message: 'User already liked post',
                count: numberOfLikes.length
            })
        }
        
        postToLike.likeCount.push({ postId, username })
        const numberOfLikes = [...new Set(postToLike.likeCount.map(post => post.username))]
        postToLike.count = numberOfLikes.length

        await postToLike.save()
        res.json({
            message: `${username} liked this post`,
            postToLike: postToLike
        })
    } catch (error) {
        console.log(error);
    }
}

// A user's comment on a post
const userComment = async (req, res) => {
    const postId = req.body.postId
    const { username, comment } = req.body

    try {
        // Using Posts.findOne, Posts.findOneAndUpdate, Posts.findByIdAndUpdate all pointed to the first post in the Posts model even if it wasn't the post clicked. Using findById did point to the clicked post in the client side.
        

        const commentByUser = await Posts.findById({ _id: postId }).exec()
          
        if (!commentByUser) return res.json({ message: 'No comments with such id' })
        

        commentByUser.comments.push({ username, comment })
            
        commentByUser.commentCount = commentByUser.comments.length  

        await commentByUser.save()
        res.status(201).json({
            postId: commentByUser._id,
            commentCount: commentByUser.commentCount
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAllPosts, updatePost, deletePost, getPost, upload, likePost, userComment}