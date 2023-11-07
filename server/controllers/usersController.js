const {
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
} = require('../service/usersService')

const searchParameters = {
    searchInput: '',
    pageSize: 30,
    operator: 'gte',
    startId: 1
}

const resetSearchParametersInController = async (_, res) => {
    searchParameters.searchInput = ''
    searchParameters.pageSize = 30
    searchParameters.operator = 'gte'
    searchParameters.startId = 1
    res.sendStatus(200)
}

const setSearchInputInController = async (req, res) => {
    searchParameters.searchInput = req.body.search
    res.sendStatus(200)
}

const setPageSizeInController = async (req, res) => {
    searchParameters.pageSize = req.body.pageSize
    res.sendStatus(200)
}

const getPageSizeInController = async (_, res) => {
    res.json(searchParameters.pageSize)
}

const setStartIdInController = async (req, res) => {
    if (
        req.body.startId.includes('+') ||
        req.body.startId.includes('-') ||
        req.body.startId.includes('.') ||
        req.body.startId.length === 0
    )
        searchParameters.startId = 1
    else searchParameters.startId = Math.floor(Number(req.body.startId))
    res.sendStatus(200)
}

const setOperatorInController = async (req, res) => {
    searchParameters.operator = req.body.operator
    res.sendStatus(200)
}

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
    const users =
        searchParameters.searchInput === ''
            ? await getUsersBatchInService(
                  Number(req.params.page),
                  searchParameters.pageSize,
                  searchParameters.startId,
                  searchParameters.operator
              )
            : await getFilteredUsersBatchInService(
                  Number(req.params.page),
                  searchParameters.searchInput,
                  searchParameters.pageSize,
                  searchParameters.startId,
                  searchParameters.operator
              )
    res.json(users)
}

const getUsersCountInController = async (_, res) => {
    const usersCount =
        searchParameters.searchInput === ''
            ? await getUsersCountInService(
                  searchParameters.startId,
                  searchParameters.operator
              )
            : await getFilteredUsersCountInService(
                  searchParameters.searchInput,
                  searchParameters.startId,
                  searchParameters.operator
              )
    res.json(usersCount)
}

const editUserInController = async (req, res) => {
    await editUserInService(req.body)
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
    getUsersCountInController,
    setSearchInputInController,
    setPageSizeInController,
    getPageSizeInController,
    setStartIdInController,
    setOperatorInController,
    resetSearchParametersInController
}
