const { login } = require('../models')

const createLoginInService = (login) => {
    return user.findOrCreate({
        where: {
            id: 1
        },
        defaults: {
            id: 1,
            admin_password: login.admin_password,
            logged_in_db: false,
            save_results: false
        }
    })
}
