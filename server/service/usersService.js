const { user } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const createUserInService = (newUser) => {
    return user.findOrCreate({
        where: {
            GSS_identification: newUser.GSS_identification
        },
        defaults: {
            GSS_identification: newUser.GSS_identification,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            nickname: newUser.nickname,
            logged_in_for_testing: false,
            user_type: newUser.user_type,
            password: newUser.password
        }
    })
}

const checkIfUserExistsInService = (data) => {
    return user.findOne({
        where: {
            GSS_identification: data.GSS_identification,
            first_name: data.first_name
        }
    })
}

const loginUserForTestingInService = (data) => {
    user.update(
        { logged_in_for_testing: true },
        {
            where: {
                GSS_identification: data.GSS_identification,
                first_name: data.first_name
            }
        }
    )
}

const checkIfUserIsLoggedInForTestingInService = (GSS_identification) => {
    return user.findOne({
        where: {
            GSS_identification: GSS_identification,
            logged_in_for_testing: true
        }
    })
}

const logoutUserForTestingInService = (GSS_identification) => {
    user.update(
        { logged_in_for_testing: false },
        { where: { GSS_identification: GSS_identification } }
    )
}

const getFilteredUsersBatchInService = (
    page,
    searchInput,
    pageSize,
    startId,
    operator
) => {
    return user.findAll({
        offset: page * pageSize,
        limit: pageSize,
        where: {
            [Op.or]: [
                { first_name: { [Op.substring]: searchInput } },
                { last_name: { [Op.substring]: searchInput } },
                { nickname: { [Op.substring]: searchInput } }
            ],
            GSS_identification: {
                [Op[operator]]: startId
            }
        }
    })
}

const getUsersBatchInService = (page, pageSize, startId, operator) => {
    return user.findAll({
        offset: page * pageSize,
        limit: pageSize,
        where: {
            GSS_identification: {
                [Op[operator]]: startId
            }
        }
    })
}

const getUsersCountInService = (startId, operator) => {
    return user.count({
        where: {
            GSS_identification: {
                [Op[operator]]: startId
            }
        }
    })
}

const getFilteredUsersCountInService = (startId, operator) => {
    return user.count({
        where: {
            [Op.or]: [
                { first_name: { [Op.substring]: searchInput } },
                { last_name: { [Op.substring]: searchInput } },
                { nickname: { [Op.substring]: searchInput } }
            ],
            GSS_identification: {
                [Op[operator]]: startId
            }
        }
    })
}

const editUserInService = (data) => {
    user.update(
        {
            first_name: data.first_name,
            last_name: data.last_name,
            nickname: data.nickname,
            user_type: data.user_type
        },
        {
            where: {
                GSS_identification: data.GSS_identification
            }
        }
    )
}

const deleteUsersInService = (GSS_identifications) => {
    user.destroy({
        where: {
            GSS_identification: GSS_identifications
        }
    })
}

module.exports = {
    createUserInService,
    checkIfUserExistsInService,
    loginUserForTestingInService,
    logoutUserForTestingInService,
    checkIfUserIsLoggedInForTestingInService,
    getUsersBatchInService,
    editUserInService,
    deleteUsersInService,
    getUsersCountInService,
    getFilteredUsersCountInService,
    getFilteredUsersBatchInService
}
