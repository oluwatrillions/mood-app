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
        const accessToken = jwt.sign({ 'name': foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '2 minutes' }
        )
        const refreshToken = jwt.sign({ 'name': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        foundUser.refreshToken = refreshToken
        const verifiedUser = await foundUser.save()
        res.cookie('user', refreshToken)
        res.json({ accessToken, message: `${foundUser.username} has successfully signed in`})
    } else {
        res.sendStatus(401);
    }
}

module.exports = handleLogin