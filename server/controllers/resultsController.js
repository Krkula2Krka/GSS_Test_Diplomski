const {
    addResultInService,
    getResultsBatchInService,
    getResultsCountInService,
    deleteResultsInService,
    getResultByPkInService
} = require('../service/resultsService')

const searchParameters = {
    pageSize: 30,
    operatorId: 'gte',
    startId: 1,
    operatorPoints: 'gte',
    aquiredPoints: 0,
    test_passed: false,
    test_passed_both: true,
    operatorDate: 'gte',
    date: 0
}

const resetSearchParametersInController = async (_, res) => {
    searchParameters.test_passed = false
    searchParameters.test_passed_both = true
    searchParameters.pageSize = 30
    searchParameters.operatorId = 'gte'
    searchParameters.operatorPoints = 'gte'
    searchParameters.operatorDate = 'gte'
    searchParameters.startId = 1
    searchParameters.aquiredPoints = 0
    searchParameters.date = 0
    res.sendStatus(200)
}

const setPageSizeInController = async (req, res) => {
    searchParameters.pageSize = req.body.pageSize
    res.sendStatus(200)
}

const getPageSizeInController = async (_, res) => {
    res.json(searchParameters.pageSize)
}

const addResultInController = async (req, res) => {
    await addResultInService(req.body)
    res.sendStatus(200)
}

const getResultsBatchInController = async (req, res) => {
    const results = await getResultsBatchInService(
        Number(req.params.user_id),
        Number(req.params.page),
        searchParameters.pageSize,
        searchParameters.startId,
        searchParameters.operatorId,
        searchParameters.aquiredPoints,
        searchParameters.operatorPoints,
        searchParameters.date,
        searchParameters.operatorDate,
        searchParameters.test_passed_both,
        searchParameters.test_passed
    )
    res.json(results)
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

const setOperatorPointsInController = async (req, res) => {
    searchParameters.operatorPoints = req.body.operator
    res.sendStatus(200)
}

const setAquiredPointsInController = async (req, res) => {
    if (
        req.body.aquiredPoints.includes('+') ||
        req.body.aquiredPoints.includes('-') ||
        req.body.aquiredPoints.includes('.') ||
        req.body.aquiredPoints.length === 0
    )
        searchParameters.aquiredPoints = 0
    else
        searchParameters.aquiredPoints = Math.floor(
            Number(req.body.aquiredPoints)
        )
    res.sendStatus(200)
}

const setOperatorIdInController = async (req, res) => {
    searchParameters.operatorId = req.body.operator
    res.sendStatus(200)
}

const setTestPassedInController = async (req, res) => {
    if (req.body.test_passed === 'оба') searchParameters.test_passed_both = true
    else if (req.body.test_passed === 'true') {
        searchParameters.test_passed_both = false
        searchParameters.test_passed = true
    } else if (req.body.test_passed === 'false') {
        searchParameters.test_passed_both = false
        searchParameters.test_passed = false
    }
    res.sendStatus(200)
}

const setDateInController = async (req, res) => {
    searchParameters.date = new Date(req.body.date)
    res.sendStatus(200)
}

const setOperatorDateInController = async (req, res) => {
    searchParameters.operatorDate = req.body.operator
    res.sendStatus(200)
}

const getResultsCountInController = async (req, res) => {
    const count = await getResultsCountInService(
        Number(req.params.user_id),
        searchParameters.startId,
        searchParameters.operatorId,
        searchParameters.aquiredPoints,
        searchParameters.operatorPoints,
        searchParameters.date,
        searchParameters.operatorDate,
        searchParameters.test_passed_both,
        searchParameters.test_passed
    )
    res.json(count)
}

const deleteResultsInController = async (req, res) => {
    await deleteResultsInService(req.body)
    res.sendStatus(200)
}

const getResultByPkInController = async (req, res) => {
    const count = await getResultByPkInService(req.params.id)
    res.json(count)
}

module.exports = {
    addResultInController,
    getResultsBatchInController,
    getResultsCountInController,
    deleteResultsInController,
    setPageSizeInController,
    getPageSizeInController,
    setStartIdInController,
    setOperatorIdInController,
    setOperatorPointsInController,
    setAquiredPointsInController,
    setTestPassedInController,
    setDateInController,
    setOperatorDateInController,
    getResultByPkInController,
    resetSearchParametersInController
}
