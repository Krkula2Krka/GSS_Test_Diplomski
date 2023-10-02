const express = require('express')
const router = express.Router()
const {
  createUserInController,
  loginUserForTestingInController,
  checkIfUserIsLoggedInForTestingInController,
  logoutUserForTestingInController,
  getAllUsersInController,
  editUserInController,
  deleteUsersInController
} = require('../controllers/usersController')

router.get('/', getAllUsersInController)

router.post('/', createUserInController)

router.post('/loginForTesting/', loginUserForTestingInController)

router.get('/checkLoginForTesting/:GSS_identification', checkIfUserIsLoggedInForTestingInController)

router.post('/logoutForTesting/:GSS_identification', logoutUserForTestingInController)

router.post('/edit/:GSS_identification', editUserInController)

router.post('/delete/', deleteUsersInController)

module.exports = router