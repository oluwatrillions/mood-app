const users = require('../model/users')
const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
    const allUsers = await users.find()
    if (!allUsers) return res.status(204).json({message: "No users found"})
    res.json(allUsers)
}

// const createUser = async (req, res) => {
//     if (!req.body.name || !req.body.username || !req.body.password) {
//         return res.status(400).json({ message: 'please fill the following fields'})
//     }
//     try {
//         const user = await users.create({
//         name: req.body.name,
//         username: req.body.username,
//         password: req.body.password
//     })
//     res.status(201).json({ message: 'new user created successfully'})
//     } catch (error) {
//         console.log(error);
//     }  
// }

const updateUser = async (req, res) => {
    if (!req.params.id) {
        res.json({message: 'Please enter a user ID to update'})
    }
    const user = await users.findOne({ _id: req.params.id }).exec()
    if (!user) {
        res.status(404).json({message: `No user with the ID ${req.params.id}`})
    } else {
        user.username = req.body.username,
        user.name = req.body.name,
        user.email = req.body.email,
        user.profileImage = req.body.profileImage    
        user.password = await bcrypt.hash(req.body.password, 12)
    }
    const updatedUser = await user.save()
    res.json({message: 'User updated successfully'})
}

const deleteUser = async (req, res) => {
    if (!req.params.id) {
        res.json({message: 'Please enter a user ID'})
    }
    const removeUser = await users.findOne({ _id: req.params.id }).exec()
    if (!removeUser) {
        return res.status(400).json({message: `No user with ID ${req.params.id}`})
    }
    const deletedUser = await users.deleteOne({_id: req.params.id})
    res.json({message: 'User deleted'})
}

const getOneUser = async (req, res) => {
    if (!req.params.id) {
        return res.json({message: 'Please enter a user ID'})
    }
    const singleUser = await users.findOne({ _id: req.params.id }).exec()
    if (!singleUser) {
        return res.json({message: `No user with the ID ${req.params.id}`})
    }
    res.json(singleUser)
}

module.exports = {getUsers, updateUser, deleteUser, getOneUser}