const users = require('../model/users')
const bcrypt = require('bcrypt')

const handleSignup = async (req, res) => {
    const { name, username, password} = req.body
    if (!name || !username || !password) {
        res.json({message: 'Please enter the following fields'})
    }
    const user = await users.findOne({ username }).exec()
    if (user) {
        return res.json({message: 'Duplicate user. Please change your username'})
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 12)
        const newUser = await users.create({
            name,
            username,
            password: hashedPwd,
        })
    } catch (error) {
        console.log(error);
    }
    res.json({message: 'User created'})
}

module.exports = handleSignup