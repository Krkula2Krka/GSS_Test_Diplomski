const {
    addResultInService,
    getResultsBatchInService,
    getResultsCountInService
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

module.exports = {
    addResultInController,
    getResultsBatchInController,
    getResultsCountInController
}
