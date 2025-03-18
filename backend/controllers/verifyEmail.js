const crypto = require("crypto");
const Users = require("../model/users");

const verifyEmail = async (req, res) => {
  const verificationToken = req.params.verificationToken;

  if (!verificationToken) {
    return res.status(400).json({ message: "verification token required" });
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const user = await Users.findOne({
    verificationToken: hashedToken,
    verificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json({ message: "Invalid or expired token" });
    return;
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;

  await user.save();

  res.status(200).json({ message: "Email verified successfully" });
};

module.exports = verifyEmail;
