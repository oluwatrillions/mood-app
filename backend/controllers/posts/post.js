const post = require('../../model/post')

const createPost = async (req, res) => {
    const { text, image } = req.body
    
    if (!text || !image) return res.json({ message: 'Please fill the following fields' })

const newPost = await post.create({
    image,
    text
})
    res.status(201).json({message: 'new post created'})
}

module.exports = createPost


