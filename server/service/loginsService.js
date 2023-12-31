const { login } = require('../models')
const Sequelize = require('sequelize')

const createLoginInService = (info) => {
    return login.findOrCreate({
        where: {
            id: 1
        },
        defaults: {
            id: 1,
            admin_logged_in: false,
            save_results: false,
            password: info.password
        }
    })
}

const getPasswordInService = () => {
    return login.findOne({
        attributes: ['password'],
        where: { id: 1 }
    })
}

const changePasswordInService = (password) => {
    login.update({ password: password }, { where: { id: 1 } })
}

const setSaveResultsInService = (save) => {
    login.update({ save_results: save }, { where: { id: 1 } })
}

const getSaveResultsInService = () => {
    return login.findOne({
        attributes: ['save_results'],
        where: { id: 1 }
    })
}

const loginInService = () => {
    login.update({ admin_logged_in: true }, { where: { id: 1 } })
}

const logoutInService = () => {
    login.update({ admin_logged_in: false }, { where: { id: 1 } })
}

module.exports = {
    createLoginInService,
    changePasswordInService,
    getPasswordInService,
    setSaveResultsInService,
    getSaveResultsInService,
    loginInService,
    logoutInService
}
