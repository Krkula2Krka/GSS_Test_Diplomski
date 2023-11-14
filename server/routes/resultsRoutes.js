const express = require('express')
const router = express.Router()
const { addResultInController } = require('../controllers/resultsController')

const { authenticateToken } = require('../controllers/loginsController')

router.post('/', addResultInController)

module.exports = router
