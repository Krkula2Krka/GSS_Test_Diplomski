const {
  createUserInService,
  checkIfUserExistsInService
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

const loginUserInController = async (req, res) => {
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
          res.json({ loginSuccessful: true, message: 'User logged in!', id: users[i].id })
        } else {
          res.json({ loginSuccessful: false, message: 'Wrong password!', id: 0 })
        }
      })
  }
}

module.exports = {
  createUserInController: createUserInController,
  loginUserInController: loginUserInController
}
