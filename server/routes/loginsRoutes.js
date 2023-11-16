const express = require('express')
const router = express.Router()
const {
    createLoginInController,
    changePasswordInController,
    setSaveResultsInController,
    getSaveResultsInController,
    loginInController,
    logoutInController,
    authenticateToken
} = require('../controllers/loginsController')

router.get('/saveResults', getSaveResultsInController)

router.post('/changePassword', authenticateToken, changePasswordInController)

router.post('/adminLogin', loginInController)

router.post('/adminLogout', authenticateToken, logoutInController)

router.post('/saveResults', authenticateToken, setSaveResultsInController)

router.post('/', createLoginInController)

module.exports = router
