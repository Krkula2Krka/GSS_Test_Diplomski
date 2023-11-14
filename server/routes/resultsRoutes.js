const express = require('express')
const router = express.Router()
const {
    addResultInController,
    getResultsBatchInController,
    getResultsCountInController
} = require('../controllers/resultsController')

const { authenticateToken } = require('../controllers/loginsController')

router.get('/count/:user_id', authenticateToken, getResultsCountInController)

router.get('/:user_id/:page', authenticateToken, getResultsBatchInController)

router.post('/', addResultInController)

module.exports = router
