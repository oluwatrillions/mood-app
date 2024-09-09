const express = require("express")
const router = express.Router()
const dotenv = require("dotenv")
const jwt = require('jsonwebtoken')
const users = require('../../../model/users')
dotenv.config()

const {OAuth2Client} = require("google-auth-library")

router.post("/", async function(req, res, next){
    res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy","no-referrer-when-downgrade");

    const redirectURL = "http://127.0.0.1:4000/auth/google"
    
    const oAuth2Client = new OAuth2Client (
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET,
        'postmessage'
    )

    const {tokens} = await oAuth2Client.getToken(req.body.code); 

    const foundUser = await jwt.decode(tokens.id_token)

    const user = await users.findOne({email: foundUser.email}).exec()
 
    if (user){
            const accessToken = jwt.sign(user.toJSON(),
                tokens.access_token
            )    
        return res.json({accessToken, message: "user already exists"})
    } else {
        const newUser = new users({
            name: foundUser.name,
            email: foundUser.email,
            username: foundUser.given_name,
            scope: tokens.scope === 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid' ? 'google' : 'local',
            profileImage: foundUser.picture || "../../../public/no-image/no-avatar.jpg",
            refreshToken: tokens.refresh_token,
        })

        const accesstoken = jwt.sign(newUser.toJSON(),
            tokens.access_token
        )

        const newFoundUser = await newUser.save()
        
        res.cookie('user', newUser.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({accesstoken, message: "new Google user created"})
    }
      
    // const authorizeUrl = oAuth2Client.generateAuthUrl({
    //     access_type: 'offline',
    //     scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
    //     prompt: 'consent'
    // });
    // res.json({url:authorizeUrl})
})

router.get('/', async function (req, res){
    const getGoogleUsers = await GoogleUsers.find()
    res.json(getGoogleUsers) 
})

module.exports = router