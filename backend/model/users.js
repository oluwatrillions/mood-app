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
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 255,
    },
    scope: {
        type: String,
        enum: ['local', 'google']
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