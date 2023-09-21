const {
  createUserInService,
  checkIfUserExistsInService,
  loginUserForTestingInService,
  logoutUserForTestingInService,
  checkIfUserIsLoggedInForTestingInService,
  getAllNonadminUsersInService
} = require('../service/usersService')

const createUserInController = async (req, res) => {

  const [user, created] = await createUserInService(req.body)
  if (created) res.json({ userExists: false })
  else
    res.json({ GSS_identification: user.GSS_identification, userExists: true })
}

const loginUserForTestingInController = async (req, res) => {
  const user = await checkIfUserExistsInService(req.params.GSS_identification)
  if (user === null) res.json({ loginSuccessful: false })
  else {
    await loginUserForTestingInService(user.GSS_identification)
    res.json({ loginSuccessful: true })
  }
}

const checkIfUserIsLoggedInForTestingInController = async (req, res) => {
  const userLoggedIn = await checkIfUserIsLoggedInForTestingInService(req.params.id)
  if (userLoggedIn) res.json({ loggedIn: true })
  else res.json({ loggedIn: false })
}

const logoutUserForTestingInController = async (req, res) => {
  const id = req.params.id
  await logoutUserForTestingInService(id)
  res.json(`User with id ${id} logged out for testing!`)
}

const getAllNonadminUsersInController = async (_, res) => {
  const users = await getAllNonadminUsersInService()
  res.json(users)
}

module.exports = {
  createUserInController: createUserInController,
  loginUserForTestingInController: loginUserForTestingInController,
  checkIfUserIsLoggedInForTestingInController:
    checkIfUserIsLoggedInForTestingInController,
  logoutUserForTestingInController: logoutUserForTestingInController,
  getAllNonadminUsersInController: getAllNonadminUsersInController
}