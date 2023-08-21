const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    name: {
        type: String,
    },
    title: {
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    username: {
        type: String
    },
    posterImage: {
        Type: String,
    },
    postedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Post', Post)