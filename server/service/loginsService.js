const { login } = require('../models')

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

module.exports = {
    createLoginInService
}
