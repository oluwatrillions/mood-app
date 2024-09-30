const users = require('../model/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: '../controllers/config/.env' })

const handleLogin = async (req, res, next) => {
    const { email, pwd } = req.body
    if (!email || !pwd) {
        return res.status(400).json({message: 'Please enter a valid username and password'})
    }
    const foundUser = await users.findOne({ email: email }).exec()
    if (!foundUser) return res.status(400).json({ message: 'This user does not exist' })
    const userPwd = await bcrypt.compare(pwd, foundUser.password) 
    if (userPwd) {

        const payload = {
            name: foundUser.name,
            username: foundUser.username,
            email: foundUser.email,
            roles: foundUser.roles,
            avatar: foundUser.profileImage,
        }

        const accessToken = jwt.sign(payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s' }
        )
        const refreshToken = jwt.sign(payload,
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        foundUser.refreshToken = refreshToken
        const verifiedUser = await foundUser.save()
        res.cookie('user', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({ accessToken, message: `${foundUser.name} has successfully signed in`})
    } else {
        res.status(401).json({message: 'Invalid password'});
    }
}

module.exports = handleLogin