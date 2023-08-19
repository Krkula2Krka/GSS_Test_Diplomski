const {
  createUserInService,
  checkIfUserExistsInService,
  loginUserForTestingInService,
  logoutUserForTestingInService,
  checkIfUserIsLoggedInForTestingInService
} = require('../service/usersService')
const bcrypt = require('bcrypt')

const createUserInController = async (req, res) => {
  const newUser = req.body
  await bcrypt.hash(newUser.GSS_identification, 10).then(hash => {
    newUser.GSS_identification = hash
  })
  await createUserInService(newUser)
  res.json('User created!')
}

const loginUserForTestingInController = async (req, res) => {
  const user = req.body
  const users = await checkIfUserExistsInService(user)
  if (users.length === 0) {
    res.json({ loginSuccessful: false, message: 'User does not exist!', id: 0 })
  }
  for (let i = 0; i < users.length; i++) {
    bcrypt
      .compare(user.GSS_identification, users[i].GSS_identification)
      .then(result => {
        if (result) {
          loginUserForTestingInService(users[i].id)
          res.json({
            loginSuccessful: true,
            message: `User with id ${users[i].id} logged in for testing!`,
            id: users[i].id
          })
        } else {
          res.json({
            loginSuccessful: false,
            message: 'Wrong password!',
            id: 0
          })
        }
      })
  }
}

const checkIfUserIsLoggedInForTestingInController = async (req, res) => {
  const id = req.params.id
  const userLoggedIn = await checkIfUserIsLoggedInForTestingInService(id)
  if (userLoggedIn) res.json({ loggedIn: true })
  else res.json({ loggedIn: false })
}

const logoutUserForTestingInController = async (req, res) => {
  const id = req.params.id
  await logoutUserForTestingInService(id)
  res.json(`User with id ${id} logged out for testing!`)
}

module.exports = {
  createUserInController: createUserInController,
  loginUserForTestingInController: loginUserForTestingInController,
  checkIfUserIsLoggedInForTestingInController:
    checkIfUserIsLoggedInForTestingInController,
  logoutUserForTestingInController: logoutUserForTestingInController
}
