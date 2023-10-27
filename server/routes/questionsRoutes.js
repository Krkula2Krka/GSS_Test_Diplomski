const express = require('express')
const router = express.Router()
const {
    createQuestionInController,
    getQuestionsBatchInController,
    deleteQuestionsInController,
    editQuestionInController,
    getTestQuestionsInController
} = require('../controllers/questionsController')

router.get('/test', getTestQuestionsInController)

router.post('/', createQuestionInController)

router.post('/delete', deleteQuestionsInController)

router.get('/:area_id/:page', getQuestionsBatchInController)

router.post('/edit/:id', editQuestionInController)

module.exports = router
