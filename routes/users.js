const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.ListUsers)
router.get('/:id', UserController.getUser)
router.post('/', UserController.AddUser)
router.put('/:id', UserController.EditUser)



module.exports = router