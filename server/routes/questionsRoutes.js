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

router.get('/test', getTestQuestionsInController)

router.get('/pageSize', getPageSizeInController)

router.get('/count/:area_id', getQuestionsCountInController)

router.get('/:area_id/:page', getQuestionsBatchInController)

router.post('/', createQuestionInController)

router.post('/delete', deleteQuestionsInController)

router.post('/reset', resetSearchParametersInController)

router.post('/setSearchInput', setSearchInputInController)

router.post('/setDifficultyFilters', setDifficultyFiltersInController)

router.post('/setImportanceFilters', setImportanceFiltersInController)

router.post('/setStartId', setStartIdInController)

router.post('/setPageSize', setPageSizeInController)

router.post('/operator', setOperatorInController)

router.post('/edit/:id', editQuestionInController)

module.exports = router
