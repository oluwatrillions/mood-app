const Users = require('../model/users')
const bcrypt = require('bcrypt')
const path = require('path')
const multer = require('multer')

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
    const { name, username, password} = req.body
    if (!name || !username || !password) {
        return res.json({message: 'Please enter the following fields'})
    }
    const user = await Users.findOne({ username }).exec()
    if (user) {
        return res.status(409).json({message: 'User exists. Please change your username'})
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 12)
        const newUser = await Users.create({
            name: req.body.name,
            username: req.body.username,
            password: hashedPwd,
            profileImage: req.file.filename,
        })
    } catch (error) {
        console.log(error);
    }
    res.json({message: `${name}'s account created successfully`})
}

module.exports = {handleSignup, upload}