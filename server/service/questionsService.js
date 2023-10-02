const { Sequelize } = require('sequelize')
const { question } = require('../models')

const createQuestionInService = newQuestion => {
  question.create(newQuestion)
}

const deleteQuestionInService = id => {
  question.destroy({
    where: {
      id: id
    }
  })
}

const getQuestionsForAreaInService = area_id => {
  return question.findAll({
    where: {
      area_id: area_id
    }
  })
}

const getTestQuestionsInService = () => {
  return question.findAll({
    order: Sequelize.literal('rand()'),
    limit: 30
  })
}

const editQuestionInService = (id, data) => {
  question.update(
    {
      question_text: data.question_text,
      difficulty: data.difficulty,
      importance: data.importance
    },
    {
      where: {
        id: id
      }
    }
  )
}

module.exports = {
  createQuestionInService: createQuestionInService,
  getQuestionsForAreaInService: getQuestionsForAreaInService,
  deleteQuestionInService: deleteQuestionInService,
  editQuestionInService: editQuestionInService,
  getTestQuestionsInService: getTestQuestionsInService
}
