const express = require('express')
const router = express.Router()
const {
  createQuestionInController,
  getQuestionsForAreaInController,
  deleteQuestionsInController,
  editQuestionInController,
  getTestQuestionsInController
} = require('../controllers/questionsController')

router.get('/test', getTestQuestionsInController)

router.post('/', createQuestionInController)

router.post('/delete', deleteQuestionsInController)

router.get('/:area_id', getQuestionsForAreaInController)

router.post('/edit/:id', editQuestionInController)

module.exports = router