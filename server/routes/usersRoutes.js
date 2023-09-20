const express = require('express')
const router = express.Router()
const {
  createUserInController,
  loginUserForTestingInController,
  checkIfUserIsLoggedInForTestingInController,
  logoutUserForTestingInController,
  getAllNonadminUsersInController
} = require('../controllers/usersController')

router.get('/', getAllNonadminUsersInController)

router.post('/', createUserInController)

router.post('/login', loginUserForTestingInController)

router.get('/checkLoginForTesting/:id', checkIfUserIsLoggedInForTestingInController)

router.post('/logoutForTesting/:id', logoutUserForTestingInController)

module.exports = router