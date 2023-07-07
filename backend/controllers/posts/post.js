const post = require('../../model/post')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb( null, '../../public/images');
  },
  filename: function(req, file, cb){
    cb( null, Date.now() + file.originalname);
  },
})


const upload = multer({
  storage: storage,
  limits:{
    fieldSize:1024 * 1024 * 3,
  },
})

const createPost = async (req, res) => {

     const image = req.file.originalname 
     const text = req.body.text
    
    // if (!text || !image) return res.json({ message: 'Please fill the following fields' })
    // console.log('before posting');

    try {
        const newPost = await post.create({
        image,
        text
        })
        console.log('after posting');
        res.status(201).json({ message: 'new post created' })
        console.log(post);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createPost, upload }


