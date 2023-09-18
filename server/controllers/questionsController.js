const {
  createQuestionInService,
  getQuestionsForAreaInService,
  deleteQuestionInService,
  editQuestionInService
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

const deleteQuestionInController = async (req, res) => {
  const id = req.params.id
  await deleteQuestionInService(id)
  res.json({ message: `Question with id ${id} deleted` })
}

const editQuestionInController = async (req, res) => {
  const id = req.params.id
  const data = req.body
  await editQuestionInService(id, data)
  res.json({ message: `Question with id ${id} updated` })
}

module.exports = {
  createQuestionInController: createQuestionInController,
  getQuestionsForAreaInController: getQuestionsForAreaInController,
  deleteQuestionInController: deleteQuestionInController,
  editQuestionInController: editQuestionInController
}