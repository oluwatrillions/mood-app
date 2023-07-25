const Post = require('../../model/post')


const getImage = async (req, res) => {
    const image = await Post.find()
    res.json(image)
}

module.exports = getImage