const {
    createAnswerInService,
    getAnswersBatchInService,
    deleteAnswerInService,
    editAnswerInService
} = require('../service/answersService')

const createAnswerInController = async (req, res) => {
    await createAnswerInService(req.body)
    res.sendStatus(200)
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
    res.sendStatus(200)
}

const deleteAnswersInController = (req, res) => {
    req.body.forEach(async (id) => await deleteAnswerInService(id))
    res.sendStatus(200)
}

module.exports = {
    createAnswerInController,
    getAnswersBatchInController,
    deleteAnswersInController,
    editAnswerInController
}
