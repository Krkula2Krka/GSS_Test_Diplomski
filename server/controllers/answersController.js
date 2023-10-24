const {
  createAnswerInService,
  getAnswersBatchInService,
  deleteAnswerInService,
  editAnswerInService
} = require('../service/answersService')

const createAnswerInController = async (req, res) => {
  await createAnswerInService(req.body)
  res.json()
}

const getAnswersBatchInController = async (req, res) => {
  const questions = await getAnswersBatchInService(
    req.params.question_id,
    req.params.page
  )
  res.json(questions)
}

const editAnswerInController = async (req, res) => {
  await editAnswerInService(req.params.id, req.body)
  res.json()
}

const deleteAnswersInController = (req, res) => {
  req.body.forEach(async id => await deleteAnswerInService(id))
  res.json()
}

module.exports = {
  createAnswerInController,
  getAnswersBatchInController,
  deleteAnswersInController,
  editAnswerInController
}
