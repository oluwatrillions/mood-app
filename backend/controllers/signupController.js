const Users = require("../model/users");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const validateEmail = require("email-validator");
const sendVerificationEmail = require("../config/nodemailer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/avatar"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
}).single("avatar");

const handleSignup = async (req, res) => {
  let { name, username, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ message: "Please enter the following fields" });
  }

  const user = await Users.findOne({ email }).exec();
  if (user) {
    return res.status(409).json({ message: "User exists." });
  }

  const userEmail = validateEmail.validate(req.body.email);
  if (!userEmail) {
    return res.status(400).json("Invalid email");
  }

  try {
    const hashedPwd = await bcrypt.hash(password, 12);

    const newUser = await Users.create({
      name:
        req.body.email === "ajosemichaeloluwatobi@yahoo.com"
          ? "Admin"
          : req.body.name,
      username: req.body.username,
      email,
      password: hashedPwd,
      roles:
        req.body.email !== "ajosemichaeloluwatobi@yahoo.com" ? "user" : "admin",
      scope: req.body.id_token ? "google" : "local",
      profileImage: req.file
        ? req.file.filename
        : "../../public/no-image/no-avatar.jpg",
    });

    if (newUser) {
      const verificationToken = newUser.generateVerificationToken();

      await newUser.save({ validateBeforeSave: false });

      const frontendURL = "http://localhost:5173";
      const verificationUrl = `${frontendURL}/verify/${verificationToken}`;

      const message = `Please verify your email by clicking the link: ${verificationUrl}`;

      await sendVerificationEmail({
        email: newUser.email,
        subject: "Email Verification",
        message,
      });

      res.status(201).json({
        status: "success",
        message: `Verification email sent. Please check your email ${newUser.email}`,
      });
    } else {
      res.status(400).json({ message: "Invalid user" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleSignup, upload };
