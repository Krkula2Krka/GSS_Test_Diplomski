const express = require('express')
const router = express.Router()
const {
    createLoginInController,
    shouldInitInController,
    changePasswordInController,
    setSaveResultsInController,
    getSaveResultsInController
} = require('../controllers/loginsController')

router.get('/shouldInit', shouldInitInController)

router.get('/saveResults', getSaveResultsInController)

router.post('/changePassword', changePasswordInController)

router.post('/saveResults', setSaveResultsInController)

router.post('/', createLoginInController)

module.exports = router
