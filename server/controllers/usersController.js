const {
    createUserInService,
    checkIfUserExistsInService,
    loginUserForTestingInService,
    logoutUserForTestingInService,
    checkIfUserIsLoggedInForTestingInService,
    getUsersBatchInService,
    editUserInService,
    deleteUsersInService,
    getUsersCountInService
} = require('../service/usersService')

const createUserInController = async (req, res) => {
    const [user, created] = await createUserInService(req.body)
    if (created) res.json({ userExists: false })
    else
        res.json({
            GSS_identification: user.GSS_identification,
            userExists: true
        })
}

const loginUserForTestingInController = async (req, res) => {
    const user = await checkIfUserExistsInService(req.body)
    if (user === null)
        res.json({ loginSuccessful: false, alreadyLoggedIn: false })
    else {
        const userLoggedIn = await checkIfUserIsLoggedInForTestingInService(
            user.GSS_identification
        )
        if (userLoggedIn)
            res.json({ loginSuccessful: false, alreadyLoggedIn: true })
        else {
            await loginUserForTestingInService(user)
            res.json({ loginSuccessful: true })
        }
    }
}

const checkIfUserIsLoggedInForTestingInController = async (req, res) => {
    const userLoggedIn = await checkIfUserIsLoggedInForTestingInService(
        req.params.GSS_identification
    )
    if (userLoggedIn) res.json({ loggedIn: true })
    else res.json({ loggedIn: false })
}

const logoutUserForTestingInController = async (req, res) => {
    await logoutUserForTestingInService(req.params.GSS_identification)
    res.sendStatus(200)
}

const getUsersBatchInController = async (req, res) => {
    const users = await getUsersBatchInService(Number(req.params.page))
    res.json(users)
}

const getUsersCountInController = async (_, res) => {
    const usersCount = await getUsersCountInService()
    res.json(usersCount)
}

const editUserInController = async (req, res) => {
    await editUserInService(req.params.GSS_identification, req.body)
    res.sendStatus(200)
}

const deleteUsersInController = async (req, res) => {
    await deleteUsersInService(req.body)
    res.sendStatus(200)
}

module.exports = {
    createUserInController,
    loginUserForTestingInController,
    checkIfUserIsLoggedInForTestingInController,
    logoutUserForTestingInController,
    getUsersBatchInController,
    editUserInController,
    deleteUsersInController,
    getUsersCountInController
}
