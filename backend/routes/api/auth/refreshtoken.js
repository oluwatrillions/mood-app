const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const users = require("../../../model/users");
dotenv.config();

router.post("/refresh-token", async (req, res) => {
  const user = req.cookies.user;

  console.log(user);

  if (!user) return res.status(401).json({ message: "no Token found" });

  const refreshToken = await verifyRefreshToken(refreshToken);

  console.log(refreshToken);
});

module.exports = router;
