const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
    createLoginInService,
    shouldInitInService,
    changePasswordInService,
    getPasswordInService,
    setSaveResultsInService,
    getSaveResultsInService,
    loginInService,
    logoutInService,
    getAdminLoggedInInService
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

const loginInController = async (req, res) => {
    const data = await shouldInitInService()
    if (data !== null && data.admin_logged_in)
        res.json({ loginSuccessful: false })
    else if (await bcrypt.compare(req.body.password, data.password)) {
        await loginInService()
        res.json({ loginSuccessful: true })
    } else return res.sendStatus(404)
}

const logoutInController = async (_, res) => {
    await logoutInService()
    res.sendStatus(200)
}

module.exports = {
    createLoginInController,
    shouldInitInController,
    changePasswordInController,
    setSaveResultsInController,
    getSaveResultsInController,
    loginInController,
    logoutInController
}
