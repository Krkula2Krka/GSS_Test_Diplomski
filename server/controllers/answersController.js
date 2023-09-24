const {
  createAnswerInService,
  getAnswersForQuestionInService,
  deleteAnswerInService,
  editAnswerInService
} = require('../service/answersService')

const createAnswerInController = async (req, res) => {
  await createAnswerInService(req.body)
  res.json()
}

const getAnswersForQuestionInController = async (req, res) => {
  const questions = await getAnswersForQuestionInService(req.params.question_id)
  res.json(questions)
}

const deleteAnswerInController = async (req, res) => {
  await deleteAnswerInService(req.params.id)
  res.json()
}

const editAnswerInController = async (req, res) => {
  await editAnswerInService(req.params.id, req.body)
  res.json()
}

module.exports = {
    createAnswerInController: createAnswerInController,
    getAnswersForQuestionInController: getAnswersForQuestionInController,
    deleteAnswerInController: deleteAnswerInController,
    editAnswerInController: editAnswerInController
}