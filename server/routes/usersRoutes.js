const express = require('express')
const router = express.Router()
const {
  createUserInController,
  loginUserInController
} = require('../controllers/usersController')

router.post('/', createUserInController)

router.post('/login', loginUserInController)

module.exports = router
