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
    setOperatorInController
} = require('../controllers/answersController')

router.get('/pageSize', getPageSizeInController)

router.get('/count/:question_id', getAnswersCountInController)

router.get('/:question_id/:page', getAnswersBatchInController)

router.post('/', createAnswerInController)

router.post('/setSearchInput', setSearchInputInController)

router.post('/setCorrectnessFilters', setCorrectnessInController)

router.post('/setStartId', setStartIdInController)

router.post('/setPageSize', setPageSizeInController)

router.post('/operator', setOperatorInController)

router.post('/delete', deleteAnswersInController)

router.post('/edit/:id', editAnswerInController)

module.exports = router
