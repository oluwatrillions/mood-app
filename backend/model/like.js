const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    username: {
        type: mongoose.Schema.Types.String,
        ref: 'Users',
    }, 
    post: {
        type: mongoose.Schema.Types.String,
        ref: "Posts"
    }
});

module.exports = mongoose.model('Like', likeSchema);