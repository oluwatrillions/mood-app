const express = require("express")
const router = express.Router()
const dotenv = require("dotenv")
const jwt = require('jsonwebtoken')
const GoogleUsers = require('../../../model/google')
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

    const user = await GoogleUsers.findOne({email: foundUser.email}).exec()

    if (user){
        return res.json({message: "user already exists"})
    } else {
        const newUser = new GoogleUsers({
            name: foundUser.name,
            email: foundUser.email,
            password: foundUser.sub,
            username: foundUser.given_name,
            profileImage: foundUser.picture || "../../../public/no-image/no-avatar.jpg",
            refreshToken: tokens.refresh_token
        })

        const accesstoken = jwt.sign(newUser.toJSON(),
            tokens.access_token
        )

        const newFoundUser = await newUser.save()
        res.json({accesstoken, newFoundUser, message: "new Google user created"})
    }


        
    // const authorizeUrl = oAuth2Client.generateAuthUrl({
    //     access_type: 'offline',
    //     scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
    //     prompt: 'consent'
    // });
    // res.json({url:authorizeUrl})
})

module.exports = router