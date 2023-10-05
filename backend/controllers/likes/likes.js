const Users = require('../../model/users')
const Posts = require('../../model/post')
const Likes = require('../../model/likes')


const getAllLikes = async (req, res) => {
  try {
    const like = await Likes.find();
    res.json(like);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLikesForPost = async (req, res) => {
  try {
    const likedPost = await Likes.find({ _id: req.params.id });
    res.json(likedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllLikes, getLikesForPost }