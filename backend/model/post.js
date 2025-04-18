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
    email: {
        type: mongoose.Schema.Types.String,
        ref: 'Users'
    },
    image: {
        type: String,
    },
    username: {
        type: String
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    count: {
            type: Number,
            default: 0
        },
    likeCount: [{
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
        username: {
            type: mongoose.Schema.Types.String,
            ref: 'Users',
        }
    }],
    commentCount: {
        type: Number,
        default: 0
    },
    comments: [{
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        },
        username: {
            type: mongoose.Schema.Types.String,
            ref: 'Users'
        }, 
        comment: {
            type: String,
        },
        profileImage: {
            type: mongoose.Schema.Types.String,
            ref: 'Users'
        }
    }],
})

module.exports = mongoose.model('Post', Post)