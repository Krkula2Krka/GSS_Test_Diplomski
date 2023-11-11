const express = require('express')
const router = express.Router()
const {
    createQuestionInController,
    getQuestionsBatchInController,
    deleteQuestionsInController,
    editQuestionInController,
    getTestQuestionsInController,
    getQuestionsCountInController,
    setSearchInputInController,
    setDifficultyFiltersInController,
    setImportanceFiltersInController,
    setPageSizeInController,
    getPageSizeInController,
    setStartIdInController,
    setOperatorInController,
    resetSearchParametersInController
} = require('../controllers/questionsController')

const { authenticateToken } = require('../controllers/loginsController')

router.get('/test', getTestQuestionsInController)

router.get('/pageSize', authenticateToken, getPageSizeInController)

router.get('/count/:area_id', authenticateToken, getQuestionsCountInController)

router.get('/:area_id/:page', authenticateToken, getQuestionsBatchInController)

router.post('/', authenticateToken, createQuestionInController)

router.post('/delete', authenticateToken, deleteQuestionsInController)

router.post('/reset', authenticateToken, resetSearchParametersInController)

router.post('/setSearchInput', authenticateToken, setSearchInputInController)

router.post(
    '/setDifficultyFilters',
    authenticateToken,
    setDifficultyFiltersInController
)

router.post(
    '/setImportanceFilters',
    authenticateToken,
    setImportanceFiltersInController
)

router.post('/setStartId', authenticateToken, setStartIdInController)

router.post('/setPageSize', authenticateToken, setPageSizeInController)

router.post('/operator', authenticateToken, setOperatorInController)

router.post('/edit/:id', authenticateToken, editQuestionInController)

module.exports = router
