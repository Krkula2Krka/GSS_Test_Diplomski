const { createLoginInService } = require('../service/loginsService')

const createLoginInController = async (req, res) => {
    await createLoginInService(req.body)
    res.sendStatus(200)
}

module.exports = {
    createLoginInController
}
