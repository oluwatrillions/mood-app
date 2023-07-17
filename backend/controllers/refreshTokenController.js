const Users = require('../model/users')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies.user) return res.sendStatus(401)
    const refreshToken = cookies.user

    const user = await Users.findOne({ refreshToken }).exec()
    if (!user) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.user !== decoded.username) {
                return res.sendStatus(403)
            }
            const accessToken = jwt.sign({
                "name": decoded.username
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '2mins' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = handleRefreshToken