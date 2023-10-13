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

const editAnswerInController = async (req, res) => {
  await editAnswerInService(req.params.id, req.body)
  res.json()
}

const deleteAnswersInController = (req, res) => {
  req.body.forEach(async id => await deleteAnswerInService(id))
  res.json()
}

module.exports = {
    createAnswerInController: createAnswerInController,
    getAnswersForQuestionInController: getAnswersForQuestionInController,
    deleteAnswersInController: deleteAnswersInController,
    editAnswerInController: editAnswerInController
}