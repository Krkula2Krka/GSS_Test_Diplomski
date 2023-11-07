const express = require('express')
const router = express.Router()
const { createLoginInController } = require('../controllers/loginsController')

router.post('/', createLoginInController)

module.exports = router
