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
    likes: [{
        likeCount: {
            type: Number,
            default: 0
        },
        likedBy: {
            type: Schema.ObjectId,
            ref: 'Users'
        }
    }]
})

module.exports = mongoose.model('Post', Post)