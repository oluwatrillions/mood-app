const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: '../controllers/config/.env' })

const AuthController = async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)

    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'error from here' })
            req.user = decoded.username
            next();
        }
    )
}

module.exports = AuthController