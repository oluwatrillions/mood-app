const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const users = require("../../../model/users");
dotenv.config();

const { OAuth2Client } = require("google-auth-library");

router.post("/", async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectURL = "http://127.0.0.1:4000/auth/google";

  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    "postmessage"
  );

  const { tokens } = await oAuth2Client.getToken({
    code: req.body.code,
    access_type: "offline",
    prompt: "consent",
  });

  const foundUser = await jwt.decode(tokens.id_token);

  const user = await users.findOne({ email: foundUser.email }).exec();

  if (user) {
    const accessToken = jwt.sign(user.toJSON(), tokens.access_token);
    return res.json({ accessToken, message: "user already exists" });
  } else {
    const newUser = new users({
      name: foundUser.name,
      email: foundUser.email,
      username: foundUser.given_name,
      scope: tokens ? "google" : "local",
      roles:
        foundUser.email === "ajosemichaeloluwatobi@yahoo.com"
          ? "admin"
          : "user",
      profileImage:
        foundUser.picture || "../../../public/no-image/no-avatar.jpg",
    });

    const accessToken = jwt.sign(newUser.toJSON(), tokens.access_token);

    // oAuth2Client.on('tokens', (tokens) => {
    //     if (tokens.refresh_token) {
    //       const newRefresh = tokens.refresh_token
    //       console.log(tokens.refresh_token);
    //     }
    //     console.log(tokens.access_token);
    //   });

    const refreshToken = jwt.sign(newUser.toJSON(), tokens.refresh_token);

    newUser.refreshToken = refreshToken;

    const newFoundUser = await newUser.save();

    res.cookie("user", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });
    res.json({ accessToken, message: "new Google user created" });
  }
});

router.get("/", async function (req, res) {
  const getGoogleUsers = await GoogleUsers.find();
  res.json(getGoogleUsers);
});

module.exports = router;
