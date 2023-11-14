const express = require('express')
const router = express.Router()
const {
    createLoginInController,
    shouldInitInController,
    changePasswordInController,
    setSaveResultsInController,
    getSaveResultsInController,
    loginInController,
    logoutInController,
    authenticateToken
} = require('../controllers/loginsController')

router.get('/shouldInit', authenticateToken, shouldInitInController)

router.get('/saveResults', getSaveResultsInController)

router.post('/changePassword', authenticateToken, changePasswordInController)

router.post('/adminLogin', loginInController)

router.post('/adminLogout', authenticateToken, logoutInController)

router.post('/saveResults', authenticateToken, setSaveResultsInController)

router.post('/', createLoginInController)

module.exports = router
