const { result } = require('../models')

const addResultInService = (newResult) => {
    result.create(newResult)
}

module.exports = {
    addResultInService
}
