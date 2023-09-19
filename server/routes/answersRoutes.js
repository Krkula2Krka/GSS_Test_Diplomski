const express = require('express')
const router = express.Router()
const {
  createAnswerInController,
  getAnswersForQuestionInController,
  deleteAnswerInController,
  editAnswerInController
} = require('../controllers/answersController')

router.post('/', createAnswerInController)

router.post('/delete/:id', deleteAnswerInController)

router.get('/:question_id', getAnswersForQuestionInController)

router.post('/edit/:id', editAnswerInController)

module.exports = router