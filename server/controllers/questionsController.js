const {
    createQuestionInService,
    getQuestionsBatchInService,
    deleteQuestionInService,
    editQuestionInService,
    getTestQuestionsInService,
    getFilteredQuestionsBatchInService,
    getQuestionsCountInService,
    getFilteredQuestionsCountInService
} = require('../service/questionsService')

const searchParameters = {
    searchInput: '',
    difficultyFilters: ['лако', 'средње', 'тешко'],
    importanceFilters: ['мање', 'средње', 'битно'],
    pageSize: 30,
    operator: 'gte',
    startId: 1
}

const setSearchInputInController = async (req, res) => {
    searchParameters.searchInput = req.body.search
    res.sendStatus(200)
}

const setDifficultyFiltersInController = async (req, res) => {
    if (req.body.search === 'све')
        searchParameters.difficultyFilters = ['лако', 'средње', 'тешко']
    else if (req.body.search === 'лако')
        searchParameters.difficultyFilters = ['лако']
    else if (req.body.search === 'средње')
        searchParameters.difficultyFilters = ['средње']
    else if (req.body.search === 'тешко')
        searchParameters.difficultyFilters = ['тешко']
    res.sendStatus(200)
}

const setImportanceFiltersInController = async (req, res) => {
    if (req.body.search === 'све')
        searchParameters.importanceFilters = ['мање', 'средње', 'битно']
    else if (req.body.search === 'мање')
        searchParameters.importanceFilters = ['мање']
    else if (req.body.search === 'средње')
        searchParameters.importanceFilters = ['средње']
    else if (req.body.search === 'битно')
        searchParameters.importanceFilters = ['битно']
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

const createQuestionInController = async (req, res) => {
    await createQuestionInService(req.body)
    res.sendStatus(200)
}

const getQuestionsBatchInController = async (req, res) => {
    const questions =
        searchParameters.searchInput === ''
            ? await getQuestionsBatchInService(
                  Number(req.params.area_id),
                  Number(req.params.page),
                  searchParameters.difficultyFilters,
                  searchParameters.importanceFilters,
                  searchParameters.pageSize,
                  searchParameters.startId,
                  searchParameters.operator
              )
            : await getFilteredQuestionsBatchInService(
                  Number(req.params.area_id),
                  Number(req.params.page),
                  searchParameters.searchInput,
                  searchParameters.difficultyFilters,
                  searchParameters.importanceFilters,
                  searchParameters.pageSize,
                  searchParameters.startId,
                  searchParameters.operator
              )
    res.json(questions)
}

const getQuestionsCountInController = async (req, res) => {
    const questionsCount =
        searchParameters.searchInput === ''
            ? await getQuestionsCountInService(
                  Number(req.params.area_id),
                  searchParameters.difficultyFilters,
                  searchParameters.importanceFilters,
                  searchParameters.startId,
                  searchParameters.operator
              )
            : await getFilteredQuestionsCountInService(
                  searchParameters.searchInput,
                  Number(req.params.area_id),
                  searchParameters.difficultyFilters,
                  searchParameters.importanceFilters,
                  searchParameters.startId,
                  searchParameters.operator
              )
    res.json(questionsCount)
}

const editQuestionInController = async (req, res) => {
    await editQuestionInService(Number(req.params.id), req.body)
    res.sendStatus(200)
}

const getTestQuestionsInController = async (req, res) => {
    const questions = await getTestQuestionsInService()
    res.json(questions)
}

const deleteQuestionsInController = (req, res) => {
    req.body.forEach(async (id) => await deleteQuestionInService(id))
    res.sendStatus(200)
}

module.exports = {
    createQuestionInController,
    getQuestionsBatchInController,
    deleteQuestionsInController,
    editQuestionInController,
    getTestQuestionsInController,
    getQuestionsCountInController,
    setSearchInputInController,
    setDifficultyFiltersInController,
    setImportanceFiltersInController,
    setPageSizeInController,
    getPageSizeInController,
    setStartIdInController,
    setOperatorInController
}
