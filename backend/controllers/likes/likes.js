const likes = require('../../model/like')


const addLike = async (req, res) => {
    const { postId, username } = req.body
    console.log(postId, username);
    try {
        const newLike = new likes({ postId, username });
        await newLike.save();
        res.json(newLike);
        console.log(newLike, 1);
    } catch (error) {
        console.log(error);
    }
}

const getAllLikes = async (req, res) => {
  try {
      const like = await likes.find();
      console.log(like);
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