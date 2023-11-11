const express = require('express')
const router = express.Router()
const {
    createUserInController,
    loginUserForTestingInController,
    checkIfUserIsLoggedInForTestingInController,
    logoutUserForTestingInController,
    getUsersBatchInController,
    editUserInController,
    deleteUsersInController,
    getUsersCountInController,
    setSearchInputInController,
    setPageSizeInController,
    getPageSizeInController,
    setStartIdInController,
    setOperatorInController,
    resetSearchParametersInController
} = require('../controllers/usersController')

const { authenticateToken } = require('../controllers/loginsController')

router.get('/count', authenticateToken, getUsersCountInController)

router.get('/pageSize', authenticateToken, getPageSizeInController)

router.get('/:page', authenticateToken, getUsersBatchInController)

router.post('/setSearchInput', authenticateToken, setSearchInputInController)

router.post('/setStartId', authenticateToken, setStartIdInController)

router.post('/setPageSize', authenticateToken, setPageSizeInController)

router.post('/reset', authenticateToken, resetSearchParametersInController)

router.post('/operator', authenticateToken, setOperatorInController)

router.post('/', authenticateToken, createUserInController)

router.post('/loginForTesting', loginUserForTestingInController)

router.get(
    '/checkLoginForTesting/:GSS_identification',
    checkIfUserIsLoggedInForTestingInController
)

router.post(
    '/logoutForTesting/:GSS_identification',
    logoutUserForTestingInController
)

router.post('/edit', authenticateToken, editUserInController)

router.post('/delete', authenticateToken, deleteUsersInController)

module.exports = router
