const post = require('../../model/post')
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


const createPost = async (req, res) => {
    const name = req.body.name
    const username = req.body.username
    const title = req.body.title
    const image = req.file.filename
    const text = req.body.text
    const avatar = req.body.posterImage
    
    if (!text || !image) return res.json({ message: 'Please fill the following fields' })

    try {
        const newPost = await post.create({
            name,
            title,
            text,
            image,
            username
        })
        res.status(201).json({ message: 'new post created' })
    } catch (error) {
        console.log(error);
    }
}


module.exports = { createPost, upload }


