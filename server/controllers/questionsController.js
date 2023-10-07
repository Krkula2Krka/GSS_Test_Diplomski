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

const editQuestionInController = async (req, res) => {
  await editQuestionInService(req.params.id, req.body)
  res.json()
}

const getTestQuestionsInController = async (req, res) => {
  const questions = await getTestQuestionsInService()
  res.json(questions)
}

const deleteQuestionsInController = (req, res) => {
  req.body.forEach(async id => await deleteQuestionInService(id))
  res.json()
}

module.exports = {
  createQuestionInController: createQuestionInController,
  getQuestionsForAreaInController: getQuestionsForAreaInController,
  deleteQuestionsInController: deleteQuestionsInController,
  editQuestionInController: editQuestionInController,
  getTestQuestionsInController: getTestQuestionsInController
}
