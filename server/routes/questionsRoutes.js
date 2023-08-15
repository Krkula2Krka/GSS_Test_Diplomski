const express = require('express')
const router = express.Router()
const {
  createQuestionInController,
  getQuestionsForAreaInController
} = require('../controllers/questionsController')

router.post('/', createQuestionInController)

router.get('/:area_id', getQuestionsForAreaInController)

module.exports = router
