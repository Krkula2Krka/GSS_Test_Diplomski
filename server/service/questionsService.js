const { Sequelize } = require('sequelize')
const { question } = require('../models')
const { answer } = require('../models')
const Op = Sequelize.Op

const createQuestionInService = (newQuestion) => {
    question.create(newQuestion)
}

const deleteQuestionInService = (id) => {
    question.destroy({
        where: {
            id: id
        }
    })
}

const getQuestionsBatchInService = (
    area_id,
    page,
    difficultyFilters,
    importanceFilters,
    pageSize,
    startId,
    operator
) => {
    return question.findAll({
        where: {
            area_id: area_id,
            difficulty: { [Op.in]: difficultyFilters },
            importance: { [Op.in]: importanceFilters },
            id: { [Op[operator]]: startId }
        },
        offset: page * pageSize,
        limit: pageSize
    })
}

const getFilteredQuestionsBatchInService = (
    area_id,
    page,
    searchInput,
    difficultyFilters,
    importanceFilters,
    pageSize,
    startId,
    operator
) => {
    return question.findAll({
        offset: page * pageSize,
        limit: pageSize,
        where: {
            question_text: { [Op.substring]: searchInput },
            area_id: area_id,
            difficulty: { [Op.in]: difficultyFilters },
            importance: { [Op.in]: importanceFilters },
            id: { [Op[operator]]: startId }
        }
    })
}

const getQuestionsCountInService = (
    area_id,
    difficultyFilters,
    importanceFilters,
    startId,
    operator
) => {
    return question.count({
        where: {
            area_id: area_id,
            difficulty: { [Op.in]: difficultyFilters },
            importance: { [Op.in]: importanceFilters },
            id: { [Op[operator]]: startId }
        }
    })
}

const getFilteredQuestionsCountInService = (
    searchInput,
    area_id,
    difficultyFilters,
    importanceFilters,
    startId,
    operator
) => {
    return question.count({
        where: {
            question_text: { [Op.like]: searchInput },
            area_id: area_id,
            difficulty: { [Op.in]: difficultyFilters },
            importance: { [Op.in]: importanceFilters },
            id: { [Op[operator]]: startId }
        }
    })
}

const getTestQuestionsInService = (importance, difficulty, limit) => {
    return question.findAll({
        order: Sequelize.literal('random()'),
        limit: limit,
        where: {
            importance: importance,
            difficulty: difficulty
        },
        include: answer
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
    createQuestionInService,
    getQuestionsBatchInService,
    deleteQuestionInService,
    editQuestionInService,
    getTestQuestionsInService,
    getFilteredQuestionsBatchInService,
    getQuestionsCountInService,
    getFilteredQuestionsCountInService
}
