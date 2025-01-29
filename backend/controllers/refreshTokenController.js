const Users = require("../model/users");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies.user;

    if (!cookies)
      return res.status(401).json({ message: "no user found in cookie" });
    const refreshToken = cookies;

    const user = await Users.findOne({ refreshToken }).exec();
    if (!user) return res.status(403).json({ message: "no valid token found" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.email !== decoded.email) {
          return res.status(403).json({ message: "Token verification failed" });
        }

        const payload = {
          name: user.name,
          username: user.username,
          email: user.email,
          avatar: user.profileImage,
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "180s",
        });

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error("Error handling refresh token", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = handleRefreshToken;
