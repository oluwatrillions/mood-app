const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')

router.get('/', userController.getUsers)
router.post('/', userController.createUser)
router.put('/', userController.updateUser)
router.delete('/', userController.deleteUser)
router.get('/:id', userController.getOneUser)


module.exports = router