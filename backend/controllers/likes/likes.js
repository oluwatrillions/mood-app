const Users = require('../../model/users')
const Posts = require('../../model/post')
const Likes = require('../../model/likes')


const addLike = async (req, res) => {
    const {postId, userId} = req.body
    try {
        const newLike = new Likes({ postId, userId });
        await newLike.save();
        res.json({ message: 'Like added successfully' });
    } catch (error) {
        console.log(error);
    }
}

const getAllLikes = async (req, res) => {
  try {
    const like = await Likes.find();
    res.json(like);
  } catch (error) {
    console.log(error);
  }
};

const getLikesForPost = async (req, res) => {
  try {
    const likedPost = await Likes.find({ _id: req.params.id });
    res.json(likedPost);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllLikes, getLikesForPost, addLike }