const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {
    createLoginInService,
    shouldInitInService,
    changePasswordInService,
    getPasswordInService,
    setSaveResultsInService,
    getSaveResultsInService,
    loginInService,
    logoutInService
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

const setSaveResultsInController = async (req, res) => {
    const login = await getSaveResultsInService()
    if (login !== null && req.verified) {
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
        const accessToken = jwt.sign(
            { data: data },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 86400 }
        )
        await loginInService()
        res.json({ loginSuccessful: true, accessToken: accessToken })
    } else return res.sendStatus(404)
}

const logoutInController = async (_, res) => {
    await logoutInService()
    res.sendStatus(200)
}

const authenticateToken = (req, res, next) => {
    const auth = req.headers['authorization']
    const token = auth && auth.split(' ')[1]
    if (token === 'null') return res.sendStatus(401)
    else
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error) => {
            if (error) return res.sendStatus(401)
            else req.verified = true
            next()
        })
}

module.exports = {
    createLoginInController,
    shouldInitInController,
    changePasswordInController,
    setSaveResultsInController,
    getSaveResultsInController,
    loginInController,
    logoutInController,
    authenticateToken
}
