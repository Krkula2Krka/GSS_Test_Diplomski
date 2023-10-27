const { answer } = require('../models')

const createAnswerInService = (newAnswer) => {
    answer.create(newAnswer)
}

const getAnswersBatchInService = (question_id, page) => {
    return answer.findAll({
        where: {
            question_id: question_id
        },
        offset: page * 30,
        limit: 30
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
    editAnswerInService
}
