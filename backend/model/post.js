const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const Post = new Schema({
    name: {
        type: String,
    },
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },
    username: {
        type: String
    },
    postedAt: {
        type: Date,
        default: Date.now()
    },
    likeCount: {
        count: {
            type: Number,
            default: 0
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
        username: {
            type: mongoose.Schema.Types.String,
            ref: 'Post',
        }
    }
})

module.exports = mongoose.model('Post', Post)