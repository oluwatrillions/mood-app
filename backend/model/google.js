const mongoose = require('mongoose')
const googleSchema = mongoose.Schema

const GoogleUsers = new googleSchema({
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
        required: false,
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

module.exports = mongoose.model('GoogleUsers', GoogleUsers)