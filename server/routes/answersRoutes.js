const express = require('express')
const router = express.Router()
const {
    createAnswerInController,
    getAnswersBatchInController,
    deleteAnswersInController,
    editAnswerInController,
    getAnswersCountInController,
    setSearchInputInController,
    setCorrectnessInController,
    setPageSizeInController,
    getPageSizeInController,
    setStartIdInController,
    setOperatorInController,
    resetSearchParametersInController
} = require('../controllers/answersController')

const { authenticateToken } = require('../controllers/loginsController')

router.get('/pageSize', authenticateToken, getPageSizeInController)

router.get(
    '/count/:question_id',
    authenticateToken,
    getAnswersCountInController
)

router.get(
    '/:question_id/:page',
    authenticateToken,
    getAnswersBatchInController
)

router.post('/', authenticateToken, createAnswerInController)

router.post('/setSearchInput', authenticateToken, setSearchInputInController)

router.post(
    '/setCorrectnessFilters',
    authenticateToken,
    setCorrectnessInController
)

router.post('/setStartId', authenticateToken, setStartIdInController)

router.post('/setPageSize', authenticateToken, setPageSizeInController)

router.post('/reset', authenticateToken, resetSearchParametersInController)

router.post('/operator', authenticateToken, setOperatorInController)

router.post('/delete', authenticateToken, deleteAnswersInController)

router.post('/edit/:id', authenticateToken, editAnswerInController)

module.exports = router
