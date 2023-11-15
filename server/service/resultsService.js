const { result } = require('../models')
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

const addResultInService = (newResult) => {
    result.create(newResult)
}

const getResultByPkInService = (id) => {
    return result.findByPk(id)
}

const getResultsBatchInService = (
    user_id,
    page,
    pageSize,
    startId,
    operatorId,
    aquiredPoints,
    operatorPoints,
    date,
    operatorDate,
    test_passed_both,
    test_passed
) => {
    if (test_passed_both)
        return result.findAll({
            offset: page * pageSize,
            limit: pageSize,
            where: {
                id: {
                    [Op[operatorId]]: startId
                },
                points_acquired: {
                    [Op[operatorPoints]]: aquiredPoints
                },
                date_of_application: {
                    [Op[operatorDate]]: date
                },
                user_id: user_id
            }
        })
    else
        return result.findAll({
            offset: page * pageSize,
            limit: pageSize,
            where: {
                id: {
                    [Op[operatorId]]: startId
                },
                points_acquired: {
                    [Op[operatorPoints]]: aquiredPoints
                },
                date_of_application: {
                    [Op[operatorDate]]: date
                },
                user_id: user_id,
                test_passed: test_passed
            }
        })
}

const getResultsCountInService = (
    user_id,
    startId,
    operatorId,
    aquiredPoints,
    operatorPoints,
    date,
    operatorDate,
    test_passed_both,
    test_passed
) => {
    if (test_passed_both)
        return result.count({
            where: {
                id: {
                    [Op[operatorId]]: startId
                },
                points_acquired: {
                    [Op[operatorPoints]]: aquiredPoints
                },
                date_of_application: {
                    [Op[operatorDate]]: date
                },
                user_id: user_id
            }
        })
    else
        return result.count({
            where: {
                id: {
                    [Op[operatorId]]: startId
                },
                points_acquired: {
                    [Op[operatorPoints]]: aquiredPoints
                },
                date_of_application: {
                    [Op[operatorDate]]: date
                },
                user_id: user_id,
                test_passed: test_passed
            }
        })
}

const deleteResultsInService = (id) => {
    result.destroy({
        where: {
            id: id
        }
    })
}

module.exports = {
    addResultInService,
    getResultsBatchInService,
    getResultsCountInService,
    deleteResultsInService,
    getResultByPkInService
}
