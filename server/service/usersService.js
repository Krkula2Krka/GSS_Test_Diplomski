const { user } = require('../models')

const createUserInService = newUser => {
  user.create(newUser)
}

const checkIfUserExistsInService = checkUser => {
  return user.findAll({
    where: {
      first_name: checkUser.first_name,
      last_name: checkUser.last_name,
      nickname: checkUser.nickname
    }
  })
}

const loginUserForTestingInService = id => {
  user.update({logged_in_for_testing: true}, {where: {id: id}})
}

const checkIfUserIsLoggedInForTestingInService = id => {
  return user.findOne({
    where: {
      id: id,
      logged_in_for_testing: true
    }
  })
}

const logoutUserForTestingInService = id => {
  user.update({logged_in_for_testing: false}, {where: {id: id}})
}

module.exports = {
  createUserInService: createUserInService,
  checkIfUserExistsInService: checkIfUserExistsInService,
  loginUserForTestingInService: loginUserForTestingInService,
  logoutUserForTestingInService: logoutUserForTestingInService,
  checkIfUserIsLoggedInForTestingInService: checkIfUserIsLoggedInForTestingInService
}
