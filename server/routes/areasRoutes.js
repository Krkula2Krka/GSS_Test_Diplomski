const express = require('express')
const router = express.Router()
const {
  getAllAreasInController,
  createAreaInController,
  getAreaByIdInController,
  getPageOfAreasInController
} = require('../controllers/areasController')

router.get('/', getAllAreasInController)

router.get('/:id', getAreaByIdInController)

router.get('/page/:pageNumber', getPageOfAreasInController)

router.post('/', createAreaInController)

module.exports = router