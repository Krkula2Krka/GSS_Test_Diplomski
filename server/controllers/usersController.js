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
    searchFilters: ['корисник', 'администратор', 'супер администратор'],
    pageSize: 30,
    operator: 'gte',
    startId: 1
}

const setSearchInputInController = async (req, res) => {
    searchParameters.searchInput = req.body.search
    res.sendStatus(200)
}

const setSearchFiltersInController = async (req, res) => {
    if (req.body.search === 'сви')
        searchParameters.searchFilters = [
            'корисник',
            'администратор',
            'супер администратор'
        ]
    else if (req.body.search === 'корисник')
        searchParameters.searchFilters = ['корисник']
    else if (req.body.search === 'администратор')
        searchParameters.searchFilters = ['администратор']
    else if (req.body.search === 'супер администратор')
        searchParameters.searchFilters = ['супер администратор']
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
                  searchParameters.searchFilters,
                  searchParameters.pageSize,
                  searchParameters.startId,
                  searchParameters.operator
              )
            : await getFilteredUsersBatchInService(
                  Number(req.params.page),
                  searchParameters.searchInput,
                  searchParameters.searchFilters,
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
                  searchParameters.searchFilters,
                  searchParameters.startId,
                  searchParameters.operator
              )
            : await getFilteredUsersCountInService(
                  searchParameters.searchInput,
                  searchParameters.searchFilters,
                  searchParameters.searchInputFilters,
                  searchParameters.startId,
                  searchParameters.operator
              )
    res.json(usersCount)
}

const editUserInController = async (req, res) => {
    await editUserInService(Number(req.params.GSS_identification), req.body)
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
    setSearchFiltersInController,
    setPageSizeInController,
    getPageSizeInController,
    setStartIdInController,
    setOperatorInController
}
