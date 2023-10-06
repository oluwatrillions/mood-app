const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    username: {
        type: mongoose.Schema.Types.String,
        ref: 'Post',
    }
});

module.exports = mongoose.model('Like', likeSchema);