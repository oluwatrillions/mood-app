const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    username: {
        type: mongoose.Schema.Types.String,
        ref: 'Users',
    }
});

module.exports = mongoose.model('Like', likeSchema);