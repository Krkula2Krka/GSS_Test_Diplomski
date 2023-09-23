const {
  createUserInService,
  checkIfUserExistsInService,
  loginUserForTestingInService,
  logoutUserForTestingInService,
  checkIfUserIsLoggedInForTestingInService,
  getAllUsersInService,
  editUserInService
} = require('../service/usersService')

const createUserInController = async (req, res) => {

  const [user, created] = await createUserInService(req.body)
  if (created) res.json({ userExists: false })
  else
    res.json({ GSS_identification: user.GSS_identification, userExists: true })
}

const loginUserForTestingInController = async (req, res) => {
  const user = await checkIfUserExistsInService(req.params.GSS_identification)
  if (user === null) res.json({ loginSuccessful: false, alreadyLoggedIn: false })
  else {
    const userLoggedIn = await checkIfUserIsLoggedInForTestingInService(req.params.GSS_identification)
    if (userLoggedIn) res.json({ loginSuccessful: false, alreadyLoggedIn: true })
    else {
      await loginUserForTestingInService(user.GSS_identification)
      res.json({ loginSuccessful: true })
    }
  }
}

const checkIfUserIsLoggedInForTestingInController = async (req, res) => {
  const userLoggedIn = await checkIfUserIsLoggedInForTestingInService(req.params.id)
  if (userLoggedIn) res.json({ loggedIn: true })
  else res.json({ loggedIn: false })
}

const logoutUserForTestingInController = async (req, res) => {
  await logoutUserForTestingInService(req.params.id)
  res.json(`User with id ${req.params.id} logged out for testing!`)
}

const getAllUsersInController = async (_, res) => {
  const users = await getAllNonadminUsersInService()
  res.json(users)
}

const editUserInController = async (req, res) => {
  await editUserInService(req.params.GSS_identification, req.body)
  res.json({ message: `Area with id ${req.params.GSS_identification} updated` })
}

module.exports = {
  createUserInController: createUserInController,
  loginUserForTestingInController: loginUserForTestingInController,
  checkIfUserIsLoggedInForTestingInController:
    checkIfUserIsLoggedInForTestingInController,
  logoutUserForTestingInController: logoutUserForTestingInController,
  getAllUsersInController: getAllUsersInController,
  editUserInController: editUserInController
}