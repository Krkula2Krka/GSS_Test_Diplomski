const { user } = require('../models')

const createUserInService = newUser => {
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
      admin: false
    }
  })
}

const checkIfUserExistsInService = GSS_identification => {
  return user.findOne({
    where: {
      GSS_identification: GSS_identification
    }
  })
}

const loginUserForTestingInService = GSS_identification => {
  user.update(
    { logged_in_for_testing: true },
    { where: { GSS_identification: GSS_identification } }
  )
}

const checkIfUserIsLoggedInForTestingInService = GSS_identification => {
  return user.findOne({
    where: {
      GSS_identification: GSS_identification,
      logged_in_for_testing: true
    }
  })
}

const logoutUserForTestingInService = GSS_identification => {
  user.update(
    { logged_in_for_testing: false },
    { where: { GSS_identification: GSS_identification } }
  )
}

const getAllUsersInService = () => {
  return user.findAll()
}

const editUserInService = (GSS_identification, data) => {
  user.update(
    {
      first_name: data.first_name,
      last_name: data.last_name,
      nickname: data.nickname,
      admin: data.admin
    },
    {
      where: {
        GSS_identification: GSS_identification
      }
    }
  )
}

module.exports = {
  createUserInService: createUserInService,
  checkIfUserExistsInService: checkIfUserExistsInService,
  loginUserForTestingInService: loginUserForTestingInService,
  logoutUserForTestingInService: logoutUserForTestingInService,
  checkIfUserIsLoggedInForTestingInService:
    checkIfUserIsLoggedInForTestingInService,
  getAllUsersInService: getAllUsersInService,
  editUserInService: editUserInService
}
