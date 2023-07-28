const mongoose = require('mongoose')
const userSchema = mongoose.Schema

const Users = new userSchema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String
    },
    refreshToken: String,
}) 

module.exports = mongoose.model('Users', Users)