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
    setSearchFiltersInController,
    setPageSizeInController,
    getPageSizeInController,
    setStartIdInController,
    setOperatorInController,
    resetSearchParametersInController
} = require('../controllers/usersController')

router.get('/count', getUsersCountInController)

router.get('/pageSize', getPageSizeInController)

router.get('/:page', getUsersBatchInController)

router.post('/setSearchInput', setSearchInputInController)

router.post('/setSearchFilters', setSearchFiltersInController)

router.post('/setStartId', setStartIdInController)

router.post('/setPageSize', setPageSizeInController)

router.post('/reset', resetSearchParametersInController)

router.post('/operator', setOperatorInController)

router.post('/', createUserInController)

router.post('/loginForTesting/', loginUserForTestingInController)

router.get(
    '/checkLoginForTesting/:GSS_identification',
    checkIfUserIsLoggedInForTestingInController
)

router.post(
    '/logoutForTesting/:GSS_identification',
    logoutUserForTestingInController
)

router.post('/edit', editUserInController)

router.post('/delete', deleteUsersInController)

module.exports = router
