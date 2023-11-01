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
            user_type: newUser.user_type
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

const getFilteredUsersBatchInService = (page, search) => {
    return user.findAll({
        offset: page * 5,
        limit: 5,
        where: {
            [Op.or]: [
                { GSS_identification: { [Op.like]: search } },
                { first_name: { [Op.like]: search } },
                { last_name: { [Op.like]: search } },
                { nickname: { [Op.like]: search } },
                { user_type: { [Op.like]: search } }
            ]
        }
    })
}

const getUsersBatchInService = (page) => {
    return user.findAll({
        offset: page * 5,
        limit: 5
    })
}

const getUsersCountInService = () => {
    return user.count()
}

const getFilteredUsersCountInService = (search) => {
    return user.count({
        where: {
            [Op.or]: [
                { GSS_identification: { [Op.like]: search } },
                { first_name: { [Op.like]: search } },
                { last_name: { [Op.like]: search } },
                { nickname: { [Op.like]: search } },
                { user_type: { [Op.like]: search } }
            ]
        }
    })
}

const editUserInService = (GSS_identification, data) => {
    user.update(
        {
            first_name: data.first_name,
            last_name: data.last_name,
            nickname: data.nickname,
            user_type: data.user_type
        },
        {
            where: {
                GSS_identification: GSS_identification
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
