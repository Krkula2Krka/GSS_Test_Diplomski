const express = require('express')
const router = express.Router()
const {
    addResultInController,
    getResultsBatchInController,
    getResultsCountInController,
    deleteResultsInController,
    setPageSizeInController,
    getPageSizeInController,
    setStartIdInController,
    setOperatorIdInController,
    setOperatorPointsInController,
    setAquiredPointsInController,
    setTestPassedInController,
    setDateInController,
    setOperatorDateInController,
    getResultByPkInController,
    resetSearchParametersInController
} = require('../controllers/resultsController')

const { authenticateToken } = require('../controllers/loginsController')

router.get('/pageSize', authenticateToken, getPageSizeInController)

router.get('/testResult/:id', authenticateToken, getResultByPkInController)

router.get('/count/:user_id', authenticateToken, getResultsCountInController)

router.get('/:user_id/:page', authenticateToken, getResultsBatchInController)

router.post('/delete', authenticateToken, deleteResultsInController)

router.post('/setTestPassed', authenticateToken, setTestPassedInController)

router.post('/setPageSize', authenticateToken, setPageSizeInController)

router.post('/setStartId', authenticateToken, setStartIdInController)

router.post('/operator', authenticateToken, setOperatorIdInController)

router.post('/setDate', authenticateToken, setDateInController)

router.post('/operatorDate', authenticateToken, setOperatorDateInController)

router.post('/reset', authenticateToken, resetSearchParametersInController)

router.post(
    '/setAquiredPoints',
    authenticateToken,
    setAquiredPointsInController
)

router.post('/operatorPoints', authenticateToken, setOperatorPointsInController)

router.post('/', addResultInController)

module.exports = router
