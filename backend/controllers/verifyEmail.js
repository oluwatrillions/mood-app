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
    $or: [
      {
        verificationToken: hashedToken,
        verificationTokenExpiry: { $gt: Date.now() },
      },
      { isVerified: true },
    ],
  });

  if (!user) {
    res.status(400).json({ message: "Invalid or expired token" });
  }

  if (user.isVerified) {
    return res.status(400).json({ message: "Email already verified" });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;

  await user.save();

  res
    .status(200)
    .json({ message: "Email successfully verified. Redirecting..." });
};

module.exports = verifyEmail;
