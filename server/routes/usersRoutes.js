const express = require('express')
const router = express.Router()
const {
  createUserInController,
  loginUserForTestingInController,
  checkIfUserIsLoggedInForTestingInController,
  logoutUserForTestingInController,
  getAllUsersInController,
  editUserInController,
  deleteUserInController,
  deleteUsersInController
} = require('../controllers/usersController')

router.get('/', getAllUsersInController)

router.post('/', createUserInController)

router.post('/loginForTesting/:GSS_identification', loginUserForTestingInController)

router.get('/checkLoginForTesting/:GSS_identification', checkIfUserIsLoggedInForTestingInController)

router.post('/logoutForTesting/:GSS_identification', logoutUserForTestingInController)

router.post('/edit/:GSS_identification', editUserInController)

router.post('/delete/', deleteUsersInController)

router.post('/delete/:GSS_identification', deleteUserInController)

module.exports = router