const Users = require('../model/users')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    console.log(cookies);
    
    if (!cookies.user) return res.sendStatus(401)
    const refreshToken = cookies.user
    const user = await Users.findOne({ refreshToken }).exec()
    console.log(user.username, 'from client');
    if (!user) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.email !== decoded.email) {
                return res.status(403).json({message: 'from here'})
            }
            const payload = {
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.profileImage,
            }
            const accessToken = jwt.sign(payload,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            res.json(accessToken)
        }
    );
}

module.exports = handleRefreshToken