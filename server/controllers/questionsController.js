const {
  createQuestionInService,
  getQuestionsForAreaInService,
  deleteQuestionInService,
  editQuestionInService,
  getTestQuestionsInService
} = require('../service/questionsService')

const createQuestionInController = async (req, res) => {
  await createQuestionInService(req.body)
  res.json()
}

const getQuestionsForAreaInController = async (req, res) => {
  const questions = await getQuestionsForAreaInService(req.params.area_id)
  res.json(questions)
}

const deleteQuestionInController = async (req, res) => {
  await deleteQuestionInService(req.params.id)
  res.json()
}

const editQuestionInController = async (req, res) => {
  await editQuestionInService(req.params.id, req.body)
  res.json()
}

const getTestQuestionsInController = async (req, res) => {
  const questions = await getTestQuestionsInService()
  res.json(questions)
}

module.exports = {
  createQuestionInController: createQuestionInController,
  getQuestionsForAreaInController: getQuestionsForAreaInController,
  deleteQuestionInController: deleteQuestionInController,
  editQuestionInController: editQuestionInController,
  getTestQuestionsInController: getTestQuestionsInController
}