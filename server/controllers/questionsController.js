const {
    createQuestionInService,
    getQuestionsBatchInService,
    deleteQuestionInService,
    editQuestionInService,
    getTestQuestionsInService,
    getFilteredQuestionsBatchInService,
    getQuestionsCountInService,
    getFilteredQuestionsCountInService
} = require('../service/questionsService')

const { getAllQuestionAnswersInService } = require('../service/answersService')

const searchParameters = {
    searchInput: '',
    difficultyFilters: ['лако', 'средње', 'тешко'],
    importanceFilters: ['мање', 'средње', 'битно'],
    pageSize: 30,
    operator: 'gte',
    startId: 1
}

const resetSearchParametersInController = async (_, res) => {
    searchParameters.searchInput = ''
    searchParameters.difficultyFilters = ['лако', 'средње', 'тешко']
    searchParameters.importanceFilters = ['мање', 'средње', 'битно']
    searchParameters.pageSize = 30
    searchParameters.operator = 'gte'
    searchParameters.startId = 1
    res.sendStatus(200)
}

const setSearchInputInController = async (req, res) => {
    searchParameters.searchInput = req.body.search
    res.sendStatus(200)
}

const setDifficultyFiltersInController = async (req, res) => {
    if (req.body.search === 'све')
        searchParameters.difficultyFilters = ['лако', 'средње', 'тешко']
    else if (req.body.search === 'лако')
        searchParameters.difficultyFilters = ['лако']
    else if (req.body.search === 'средње')
        searchParameters.difficultyFilters = ['средње']
    else if (req.body.search === 'тешко')
        searchParameters.difficultyFilters = ['тешко']
    res.sendStatus(200)
}

const setImportanceFiltersInController = async (req, res) => {
    if (req.body.search === 'све')
        searchParameters.importanceFilters = ['мање', 'средње', 'битно']
    else if (req.body.search === 'мање')
        searchParameters.importanceFilters = ['мање']
    else if (req.body.search === 'средње')
        searchParameters.importanceFilters = ['средње']
    else if (req.body.search === 'битно')
        searchParameters.importanceFilters = ['битно']
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

const createQuestionInController = async (req, res) => {
    await createQuestionInService(req.body)
    res.sendStatus(200)
}

const getQuestionsBatchInController = async (req, res) => {
    const questions =
        searchParameters.searchInput === ''
            ? await getQuestionsBatchInService(
                  Number(req.params.area_id),
                  Number(req.params.page),
                  searchParameters.difficultyFilters,
                  searchParameters.importanceFilters,
                  searchParameters.pageSize,
                  searchParameters.startId,
                  searchParameters.operator
              )
            : await getFilteredQuestionsBatchInService(
                  Number(req.params.area_id),
                  Number(req.params.page),
                  searchParameters.searchInput,
                  searchParameters.difficultyFilters,
                  searchParameters.importanceFilters,
                  searchParameters.pageSize,
                  searchParameters.startId,
                  searchParameters.operator
              )
    res.json(questions)
}

const getQuestionsCountInController = async (req, res) => {
    const questionsCount =
        searchParameters.searchInput === ''
            ? await getQuestionsCountInService(
                  Number(req.params.area_id),
                  searchParameters.difficultyFilters,
                  searchParameters.importanceFilters,
                  searchParameters.startId,
                  searchParameters.operator
              )
            : await getFilteredQuestionsCountInService(
                  searchParameters.searchInput,
                  Number(req.params.area_id),
                  searchParameters.difficultyFilters,
                  searchParameters.importanceFilters,
                  searchParameters.startId,
                  searchParameters.operator
              )
    res.json(questionsCount)
}

const editQuestionInController = async (req, res) => {
    await editQuestionInService(Number(req.params.id), req.body)
    res.sendStatus(200)
}

const FisherYatesAkaKnuthShuffle = (array) => {
    let currentIndex = array.length,
        randomIndex
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ]
    }
    return array
}

const getTestQuestionsInController = async (_, res) => {
    let questions = await getTestQuestionsInService('битно', 'тешко', 4)
    const important_medium_questions = await getTestQuestionsInService(
        'битно',
        'средње',
        5
    )
    questions = questions.concat(important_medium_questions)
    const important_easy_questions = await getTestQuestionsInService(
        'битно',
        'лако',
        7
    )
    questions = questions.concat(important_easy_questions)
    const medium_hard_questions = await getTestQuestionsInService(
        'средње',
        'тешко',
        1
    )
    questions = questions.concat(medium_hard_questions)
    const medium_medium_questions = await getTestQuestionsInService(
        'средње',
        'средње',
        3
    )
    questions = questions.concat(medium_medium_questions)
    const medium_easy_questions = await getTestQuestionsInService(
        'средње',
        'лако',
        5
    )
    questions = questions.concat(medium_easy_questions)
    const less_medium_questions = await getTestQuestionsInService(
        'мање',
        'средње',
        2
    )
    questions = questions.concat(less_medium_questions)
    const less_easy_questions = await getTestQuestionsInService(
        'мање',
        'лако',
        3
    )
    questions = questions.concat(less_easy_questions)
    questions = FisherYatesAkaKnuthShuffle(questions)
    res.json(
        questions.map(async (question) => {
            const answers = await getAllQuestionAnswersInService(question.id)
            return {
                question_id: question.id,
                question_text: question.question_text,
                answer1_id: answers[0].id,
                answer1_text: answers[0].answer_text,
                answer1_correctness: answers[0].correctness,
                answer2_id: answers[1].id,
                answer2_text: answers[1].answer_text,
                answer2_correctness: answers[1].correctness,
                answer3_id: answers[2].id,
                answer3_text: answers[2].answer_text,
                answer3_correctness: answers[2].correctness,
                answer4_id: answers[3].id,
                answer4_text: answers[3].answer_text,
                answer4_correctness: answers[3].correctness
            }
        })
    )
}

const deleteQuestionsInController = (req, res) => {
    req.body.forEach(async (id) => await deleteQuestionInService(id))
    res.sendStatus(200)
}

module.exports = {
    createQuestionInController,
    getQuestionsBatchInController,
    deleteQuestionsInController,
    editQuestionInController,
    getTestQuestionsInController,
    getQuestionsCountInController,
    setSearchInputInController,
    setDifficultyFiltersInController,
    setImportanceFiltersInController,
    setPageSizeInController,
    getPageSizeInController,
    setStartIdInController,
    setOperatorInController,
    resetSearchParametersInController
}
