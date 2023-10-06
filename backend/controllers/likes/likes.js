const Likes = require('../../model/likes')


const addLike = async (req, res) => {
    const { postId, username } = req.body
    try {
        const newLike = new Likes({ postId, username });
        await newLike.save();
        res.json(newLike);
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