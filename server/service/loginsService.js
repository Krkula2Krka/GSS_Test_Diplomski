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

const shouldInitInService = () => {
    return login.findByPk(1)
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

const getSaveResultsInService = (save) => {
    return login.findOne({
        attributes: ['save_results'],
        where: { id: 1 }
    })
}

module.exports = {
    createLoginInService,
    shouldInitInService,
    changePasswordInService,
    getPasswordInService,
    setSaveResultsInService,
    getSaveResultsInService
}
