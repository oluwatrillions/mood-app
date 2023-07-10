const users = require('../model/users')
const bcrypt = require('bcrypt')

const handleLogin = async (req, res, next) => {
    const { user, pwd } = req.body
    if (!user || !pwd) {
        return res.json({message: 'Please enter a valid username and password'})
    }
    const foundUser = await users.findOne({ username: user }).exec()
    if (!foundUser) return res.status(400).json({ message: 'This user does not exist' })
    const userPwd = await bcrypt.compare(pwd, foundUser.password) 
    if (userPwd) {
        // const loggedUser = await foundUser.save()
        res.json({message: `${foundUser.username} is logged in successfully. Redirecting...`})
    } else {
        res.json({message: 'Incorrect password, Please try again'})
    }
}

module.exports = handleLogin