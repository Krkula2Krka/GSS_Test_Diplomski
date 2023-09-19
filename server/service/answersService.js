const { answer } = require('../models')

const createAnswerInService = newAnswer => {
  answer.create(newAnswer)
}

const getAnswersForQuestionInService = question_id => {
  return answer.findAll({
    where: {
      question_id: question_id
    }
  })
}

const deleteAnswerInService = id => {
  answer.destroy({
    where: {
      id: id
    }
  })
}

const editAnswerInService = (id, data) => {
  answer.update(
    {
      answer_text: data.answer_text,
      correctness: data.correctness,
    },
    {
      where: {
        id: id
      }
    }
  )
}

module.exports = {
  createAnswerInService: createAnswerInService,
  getAnswersForQuestionInService: getAnswersForQuestionInService,
  deleteAnswerInService: deleteAnswerInService,
  editAnswerInService: editAnswerInService
}