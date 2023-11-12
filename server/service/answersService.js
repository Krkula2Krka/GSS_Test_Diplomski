const { answer } = require('../models')
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

const createAnswerInService = (newAnswer) => {
    answer.create(newAnswer)
}

const getAllQuestionAnswersInService = (question_id) => {
    return answer.findAll({
        where: {
            question_id: question_id
        }
    })
}

const getAnswersBatchInService = (
    question_id,
    page,
    correctness,
    both,
    pageSize,
    startId,
    operator
) => {
    if (both)
        return answer.findAll({
            where: {
                question_id: question_id,
                id: { [Op[operator]]: startId }
            },
            offset: page * pageSize,
            limit: pageSize
        })
    else
        return answer.findAll({
            where: {
                question_id: question_id,
                id: { [Op[operator]]: startId },
                correctness: correctness
            },
            offset: page * pageSize,
            limit: pageSize
        })
}

const getFilteredAnswersBatchInService = (
    question_id,
    page,
    searchInput,
    correctness,
    both,
    pageSize,
    startId,
    operator
) => {
    if (both)
        return answer.findAll({
            offset: page * pageSize,
            limit: pageSize,
            where: {
                answer_text: { [Op.substring]: searchInput },
                question_id: question_id,
                id: { [Op[operator]]: startId }
            }
        })
    else
        return answer.findAll({
            offset: page * pageSize,
            limit: pageSize,
            where: {
                answer_text: { [Op.like]: searchInput },
                question_id: question_id,
                id: { [Op[operator]]: startId },
                correctness: correctness
            }
        })
}

const getAnswersCountInService = (
    question_id,
    correctness,
    both,
    startId,
    operator
) => {
    if (both)
        return answer.count({
            where: {
                question_id: question_id,
                id: { [Op[operator]]: startId }
            }
        })
    else
        return answer.count({
            where: {
                question_id: question_id,
                id: { [Op[operator]]: startId },
                correctness: correctness
            }
        })
}

const getFilteredAnswersCountInService = (
    searchInput,
    question_id,
    correctness,
    both,
    startId,
    operator
) => {
    if (both)
        return answer.count({
            where: {
                answer_text: { [Op.like]: searchInput },
                question_id: question_id,
                id: { [Op[operator]]: startId }
            }
        })
    else
        return answer.count({
            where: {
                answer_text: { [Op.like]: searchInput },
                question_id: question_id,
                id: { [Op[operator]]: startId },
                correctness: correctness
            }
        })
}

const deleteAnswerInService = (id) => {
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
            correctness: data.correctness
        },
        {
            where: {
                id: id
            }
        }
    )
}

module.exports = {
    createAnswerInService,
    getAnswersBatchInService,
    deleteAnswerInService,
    editAnswerInService,
    getFilteredAnswersBatchInService,
    getAnswersCountInService,
    getFilteredAnswersCountInService,
    getAllQuestionAnswersInService
}
