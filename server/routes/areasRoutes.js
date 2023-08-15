const express = require('express')
const router = express.Router()
const {
  getAllAreasInController,
  createAreaInController,
  getAreaByIdInController
} = require('../controllers/areasController')

router.get('/', getAllAreasInController)

router.get('/:id', getAreaByIdInController)

router.post('/', createAreaInController)

module.exports = router
