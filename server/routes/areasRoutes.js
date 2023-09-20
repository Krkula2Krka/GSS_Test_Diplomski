const express = require('express')
const router = express.Router()
const {
  getAllAreasInController,
  createAreaInController,
  getAreaByIdInController,
  getPageOfAreasInController,
  deleteAreaInController,
  editAreaInController
} = require('../controllers/areasController')

router.get('/', getAllAreasInController)

router.get('/:id', getAreaByIdInController)

router.get('/page/:pageNumber', getPageOfAreasInController)

router.post('/', createAreaInController)

router.post('/delete/:id', deleteAreaInController)

router.post('/edit/:id', editAreaInController)

module.exports = router