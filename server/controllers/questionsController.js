const {
  createQuestionInService,
  getQuestionsBatchInService,
  deleteQuestionInService,
  editQuestionInService,
  getTestQuestionsInService
} = require('../service/questionsService')

const createQuestionInController = async (req, res) => {
  await createQuestionInService(req.body)
  res.json()
}

const getQuestionsBatchInController = async (req, res) => {
  const questions = await getQuestionsBatchInService(
    req.params.area_id,
    req.params.page
  )
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
  createQuestionInController,
  getQuestionsBatchInController,
  deleteQuestionsInController,
  editQuestionInController,
  getTestQuestionsInController
}
