const express = require('express')
const router = express.Router()
const { getAllAreasInController, createAreaInController } = require('../controllers/areasController')

router.get('/', getAllAreasInController)

router.post('/', createAreaInController)

module.exports = router