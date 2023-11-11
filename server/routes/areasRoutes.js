const express = require('express')
const router = express.Router()
const {
    getAllAreasInController,
    createAreaInController,
    deleteAreaInController,
    editAreaInController
} = require('../controllers/areasController')

const { authenticateToken } = require('../controllers/loginsController')

router.get('/', authenticateToken, getAllAreasInController)

router.post('/', authenticateToken, createAreaInController)

router.post('/delete/:id', authenticateToken, deleteAreaInController)

router.post('/edit/:id', authenticateToken, editAreaInController)

module.exports = router
