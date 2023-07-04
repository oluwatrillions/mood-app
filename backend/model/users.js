const mongoose = require('mongoose')
const userSchema = mongoose.Schema

const Users = new userSchema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },  
}) 

module.exports = mongoose.model('Users', Users)