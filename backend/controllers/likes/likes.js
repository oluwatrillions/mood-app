const Users = require('../../model/users')
const Posts = require('../../model/post')

const likes = async (req, res) => {
    const post = await Posts.findOne({ _id: req.body._id }).populate('post')
    console.log(post);
}

module.exports = { likes }