const users = require('../model/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: '../controllers/config/.env' })

const handleLogin = async (req, res, next) => {
    const { user, pwd } = req.body
    if (!user || !pwd) {
        return res.status(400).json({message: 'Please enter a valid username and password'})
    }
    const foundUser = await users.findOne({ username: user }).exec()
    if (!foundUser) return res.status(400).json({ message: 'This user does not exist' })
    const userPwd = await bcrypt.compare(pwd, foundUser.password) 
    if (userPwd) {

        const payload = {
            name: foundUser.name,
            username: foundUser.username,
            avatar: foundUser.profileImage,
        }

        const accessToken = jwt.sign(payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        )
        const refreshToken = jwt.sign({ 'name': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '10s' }
        )
        foundUser.refreshToken = refreshToken
        const verifiedUser = await foundUser.save()
        res.cookie('user', refreshToken)
        res.json({ accessToken, message: `${foundUser.username} has successfully signed in`})
    } else {
        res.status(401).json({message: 'Invalid password'});
    }
}

module.exports = handleLogin