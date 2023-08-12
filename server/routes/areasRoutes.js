const express = require('express')
const router = express.Router()
const { area } = require('../models')

router.get('/', async (req, res) => {
    const areas = await area.findAll()
    res.json(areas)
})

router.post('/', async (req, res) => {
    const newArea = req.body
    await area.create(newArea)
    res.json(newArea)
})

module.exports = router