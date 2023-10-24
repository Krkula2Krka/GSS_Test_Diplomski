const express = require('express')
const router = express.Router()
const {
  createAnswerInController,
  getAnswersBatchInController,
  deleteAnswersInController,
  editAnswerInController
} = require('../controllers/answersController')

router.post('/', createAnswerInController)

router.post('/delete', deleteAnswersInController)

router.get('/:question_id/:page', getAnswersBatchInController)

router.post('/edit/:id', editAnswerInController)

module.exports = router