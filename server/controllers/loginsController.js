const bcrypt = require('bcrypt')

const {
    createLoginInService,
    shouldInitInService,
    changePasswordInService,
    getPasswordInService,
    setSaveResultsInService,
    getSaveResultsInService
} = require('../service/loginsService')

const createLoginInController = async (req, res) => {
    await createLoginInService(req.body)
    res.sendStatus(200)
}

const shouldInitInController = async (req, res) => {
    const init = await shouldInitInService(req.body)
    res.json({ shouldInit: init === null })
}

const changePasswordInController = async (req, res) => {
    const login = await getPasswordInService()
    if (
        login !== null &&
        (await bcrypt.compare(req.body.old_password, login.password))
    ) {
        const password = await bcrypt.hash(req.body.new_password, 10)
        await changePasswordInService(password)
        return res.sendStatus(200)
    }
    return res.sendStatus(404)
}

const setSaveResultsInController = async (_, res) => {
    const login = await getSaveResultsInService()
    if (login !== null) {
        await setSaveResultsInService(!login.save_results)
        return res.sendStatus(200)
    } else res.sendStatus(404)
}

const getSaveResultsInController = async (_, res) => {
    const login = await getSaveResultsInService()
    if (login !== null) return res.json(login.save_results)
    else return res.sendStatus(404)
}

module.exports = {
    createLoginInController,
    shouldInitInController,
    changePasswordInController,
    setSaveResultsInController,
    getSaveResultsInController
}
