const { question } = require('../models')

const createQuestionInService = (newQuestion) => {
    question.create(newQuestion)
    return newQuestion
}

const getQuestionsForAreaInService = (area_id) => {
    return question.findAll({
        where: {
            area_id: area_id
        }
    })
}

module.exports = {
    createQuestionInService: createQuestionInService,
    getQuestionsForAreaInService: getQuestionsForAreaInService
}