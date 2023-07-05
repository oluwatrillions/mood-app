const mongoose = require('mongoose')
const schema = mongoose.Schema

const Post = new schema({
    name: {
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    postTime: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Post', Post)