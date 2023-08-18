const users = require('../model/users')

const logoutUser = async (req, res) => {
    const cookies = req.cookies
    if (!cookies.user) return res.sendStatus(204)
    const refreshToken = cookies.jwt

    const user = await users.findOne({ refreshToken }).exec()
    if (!user) {
        res.clearCookie('user')
        return res.sendStatus(403)
    }
    user.refreshToken = ''
    const loggedOutUser = await user.save()
    res.clearCookie('user')
    res.json({message: `${user.name} is logged out`})
}

module.exports = logoutUser