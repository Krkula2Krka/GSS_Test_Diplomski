const {
    createAnswerInService,
    getAnswersBatchInService,
    deleteAnswerInService,
    editAnswerInService,
    getFilteredAnswersBatchInService,
    getAnswersCountInService,
    getFilteredAnswersCountInService
} = require('../service/answersService')

const searchParameters = {
    searchInput: '',
    correctness: false,
    both: true,
    pageSize: 30,
    operator: 'gte',
    startId: 1
}

const resetSearchParametersInController = async (_, res) => {
    searchParameters.searchInput = ''
    searchParameters.correctness = false
    searchParameters.both = true
    searchParameters.pageSize = 30
    searchParameters.operator = 'gte'
    searchParameters.startId = 1
    res.sendStatus(200)
}

const setSearchInputInController = async (req, res) => {
    searchParameters.searchInput = req.body.search
    res.sendStatus(200)
}

const setCorrectnessInController = async (req, res) => {
    if (req.body.correctness === 'оба') searchParameters.both = true
    else if (req.body.correctness === 'true') {
        searchParameters.both = false
        searchParameters.correctness = true
    } else if (req.body.correctness === 'false') {
        searchParameters.both = false
        searchParameters.correctness = false
    }
    res.sendStatus(200)
}

const setPageSizeInController = async (req, res) => {
    searchParameters.pageSize = req.body.pageSize
    res.sendStatus(200)
}

const getPageSizeInController = async (_, res) => {
    res.json(searchParameters.pageSize)
}

const setStartIdInController = async (req, res) => {
    if (
        req.body.startId.includes('+') ||
        req.body.startId.includes('-') ||
        req.body.startId.includes('.') ||
        req.body.startId.length === 0
    )
        searchParameters.startId = 1
    else searchParameters.startId = Math.floor(Number(req.body.startId))
    res.sendStatus(200)
}

const setOperatorInController = async (req, res) => {
    searchParameters.operator = req.body.operator
    res.sendStatus(200)
}

const createAnswerInController = async (req, res) => {
    await createAnswerInService(req.body)
    res.sendStatus(200)
}

const getAnswersBatchInController = async (req, res) => {
    const answers =
        searchParameters.searchInput === ''
            ? await getAnswersBatchInService(
                  Number(req.params.question_id),
                  Number(req.params.page),
                  searchParameters.correctness,
                  searchParameters.both,
                  searchParameters.pageSize,
                  searchParameters.startId,
                  searchParameters.operator
              )
            : await getFilteredAnswersBatchInService(
                  Number(req.params.question_id),
                  Number(req.params.page),
                  searchParameters.searchInput,
                  searchParameters.correctness,
                  searchParameters.both,
                  searchParameters.pageSize,
                  searchParameters.startId,
                  searchParameters.operator
              )
    res.json(answers)
}

const getAnswersCountInController = async (req, res) => {
    const questionsCount =
        searchParameters.searchInput === ''
            ? await getAnswersCountInService(
                  Number(req.params.question_id),
                  searchParameters.correctness,
                  searchParameters.both,
                  searchParameters.startId,
                  searchParameters.operator
              )
            : await getFilteredAnswersCountInService(
                  searchParameters.searchInput,
                  Number(req.params.question_id),
                  searchParameters.correctness,
                  searchParameters.both,
                  searchParameters.startId,
                  searchParameters.operator
              )
    res.json(questionsCount)
}

const editAnswerInController = async (req, res) => {
    await editAnswerInService(req.params.id, req.body)
    res.sendStatus(200)
}

const deleteAnswersInController = async (req, res) => {
    await deleteAnswerInService(req.body)
    res.sendStatus(200)
}

module.exports = {
    createAnswerInController,
    getAnswersBatchInController,
    deleteAnswersInController,
    editAnswerInController,
    getAnswersCountInController,
    setSearchInputInController,
    setCorrectnessInController,
    setPageSizeInController,
    getPageSizeInController,
    setStartIdInController,
    setOperatorInController,
    resetSearchParametersInController
}
