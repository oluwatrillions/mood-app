const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema

const Post = new Schema({
    name: {
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
    // author: {
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     ref: 'Users'
    // },
    postTime: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Post', Post)