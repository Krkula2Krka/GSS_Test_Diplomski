const {
  createQuestionInService,
  getQuestionsForAreaInService
} = require('../service/questionsService')

const createQuestionInController = async (req, res) => {
  const newQuestion = req.body
  await createQuestionInService(newQuestion)
  res.json(newQuestion)
}

const getQuestionsForAreaInController = async (req, res) => {
  const area_id = req.params.area_id
  const questions = await getQuestionsForAreaInService(area_id)
  res.json(questions)
}

module.exports = {
  createQuestionInController: createQuestionInController,
  getQuestionsForAreaInController: getQuestionsForAreaInController
}