const mongoose = require('mongoose')
const userSchema = mongoose.Schema

const Users = new userSchema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 255,
        required: true,
    },
    username: {
        type: String,
        minlength: 4,
        maxlength: 255,
        required: true,
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 255,
        required: true,
    },
    profileImage: {
        type: String
    },
    registeredAt: {
        type: Date,
        default: Date.now(),
    },
    refreshToken: String,
}) 

module.exports = mongoose.model('Users', Users)