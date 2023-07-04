const users = require('../model/users')
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body
    if(!user )
}