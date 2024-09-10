const Users = require('../model/users')
const bcrypt = require('bcrypt')
const path = require('path')
const multer = require('multer')
const validateEmail = require("email-validator")
const transporter = require("../config/nodemailer")

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb( null, path.join(__dirname, '../public/avatar'));
  },
  filename: function(req, file, cb){
    cb( null, Date.now() + '_' + file.originalname);
  },
})

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
}).single('avatar');

const handleSignup = async (req, res) => {
    let { name, username, email, password} = req.body
    if (!name || !email || !password) {
        return res.json({message: 'Please enter the following fields'})
    }

    const user = await Users.findOne({ email }).exec()
    if (user) {
        return res.status(409).json({message: 'User exists. Please change your username'})
    }

    const userEmail = validateEmail.validate(req.body.email);
    if (!userEmail) {
        return res.status(400).json('Invalid email');
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 12)      

        const newUser = await Users.create({
            name: req.body.name,
            username: req.body.username,
            email,
            password: hashedPwd,
            roles: req.body.email !== 'ajosemichaeloluwatobi@yahoo.com' ? 'user' : 'admin',
            scope: req.body.id_token ? 'google' : 'local',
            profileImage: req.file ? req.file.filename : "../../public/no-image/no-avatar.jpg"
        })  

        const messageOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Welcome to The Mood App",
            text: "Thank you for checking out my portfolio and my work."
        }

        transporter.sendMail(messageOptions, function(error, info){
            if (error){
                console.log("Erroe", error);
            } else {
                console.log("Email sent");
            }
        })
        
    } catch (error) {
        console.log(error);
    }
    res.json(`${name}'s account created successfully`)
}

module.exports = {handleSignup, upload}