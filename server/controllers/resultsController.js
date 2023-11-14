const { addResultInService } = require('../service/resultsService')

const addResultInController = async (req, res) => {
    await addResultInService(req.body)
    res.sendStatus(200)
}

module.exports = {
    addResultInController
}
