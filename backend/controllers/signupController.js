const Users = require('../model/users')
const bcrypt = require('bcrypt')
const path = require('path')
const multer = require('multer')
const validateEmail = require("email-validator")

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
    if (!name || !username || !password) {
        return res.json({message: 'Please enter the following fields'})
    }

    const user = await Users.findOne({ username }).exec()
    if (user) {
        return res.status(409).json({message: 'User exists. Please change your username'})
    }

    const userEmail = validateEmail.validate(req.body.email);
    if (!userEmail) {
        return res.status(400).json('Invalid email');
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 12)
        const userEmail = validateEmail.validate(req.body.email) 
      

        const newUser = await Users.create({
            name: req.body.name,
            username: req.body.username,
            email,
            password: hashedPwd,
            profileImage: req.file ? req.file.filename : null
        })   
    } catch (error) {
        console.log(error);
    }
    res.json(`${name}'s account created successfully`)
}

module.exports = {handleSignup, upload}