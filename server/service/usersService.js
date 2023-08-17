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

module.exports = {
  createUserInService: createUserInService,
  checkIfUserExistsInService: checkIfUserExistsInService
}
