const express = require("express")
const router = express.Router()
const dotenv = require("dotenv")
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
    console.log(tokens);
    
    res.json(tokens)
    
    // const authorizeUrl = oAuth2Client.generateAuthUrl({
    //     access_type: 'offline',
    //     scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
    //     prompt: 'consent'
    // });
    // res.json({url:authorizeUrl})
})

module.exports = router