const post = require('../../model/post')
const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb( null, path.join(__dirname, '../../images'));
  },
  filename: function(req, file, cb){
    cb( null, file.originalname + Date.now());
  },
})


const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
}).single('images');

const createPost = async (req, res) => {

    const image = req.file.filename
    const text = req.body.text
    
    if (!text || !image) return res.json({ message: 'Please fill the following fields' })

    try {
        const newPost = await post.create({
            text,
            image
        })
        res.status(201).json({ message: 'new post created' })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createPost, upload }


