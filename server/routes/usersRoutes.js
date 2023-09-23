const express = require('express')
const router = express.Router()
const {
  createUserInController,
  loginUserForTestingInController,
  checkIfUserIsLoggedInForTestingInController,
  logoutUserForTestingInController,
  getAllUsersInController,
  editUserInController
} = require('../controllers/usersController')

router.get('/', getAllUsersInController)

router.post('/', createUserInController)

router.post('/loginForTesting/:GSS_identification', loginUserForTestingInController)

router.get('/checkLoginForTesting/:id', checkIfUserIsLoggedInForTestingInController)

router.post('/logoutForTesting/:id', logoutUserForTestingInController)

router.post('/edit/:GSS_identification', editUserInController)

module.exports = router