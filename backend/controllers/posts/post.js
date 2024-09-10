const post = require('../../model/post')
const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: function (req, file, cb) {
    cb( null, Date.now() + '_' + file.originalname);
  },
})

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
}).single('images');



const createPost = async (req, res) => {
    const name = req.body.name
    const username = req.body.username
    const email = req.body.email
    const title = req.body.title
    const image= req.file ? req.file.filename : req.body.image
    const text = req.body.text
    const likeCount = req.body.likeCount
    const comments = req.body.comments
    
        if(!title || !image || !text) return res.status(204).json({ message: 'Please fill the following fields' })
    try {
        const newPost = await post.create({
            name,
            title,
            text,
            image,
            username,
            email,
            likeCount,
            comments
        })
        res.status(201).json({message: 'post created successfully, Redirecting...'})
    } catch (error) {
        console.log(error);
    }
}


module.exports = { createPost, upload }


