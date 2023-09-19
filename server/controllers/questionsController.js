const {
  createQuestionInService,
  getQuestionsForAreaInService,
  deleteQuestionInService,
  editQuestionInService
} = require('../service/questionsService')

const createQuestionInController = async (req, res) => {
  await createQuestionInService(req.body)
  res.json({ message: 'Question successfully created' })
}

const getQuestionsForAreaInController = async (req, res) => {
  const questions = await getQuestionsForAreaInService(req.params.area_id)
  res.json(questions)
}

const deleteQuestionInController = async (req, res) => {
  await deleteQuestionInService(req.params.id)
  res.json({ message: `Question with id ${req.params.id} deleted` })
}

const editQuestionInController = async (req, res) => {
  await editQuestionInService(req.params.id, req.body)
  res.json({ message: `Question with id ${req.params.id} updated` })
}

module.exports = {
  createQuestionInController: createQuestionInController,
  getQuestionsForAreaInController: getQuestionsForAreaInController,
  deleteQuestionInController: deleteQuestionInController,
  editQuestionInController: editQuestionInController
}