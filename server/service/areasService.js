const { area } = require('../models')

const getAllAreasInService = () => {
    const areas = area.findAll()
    return areas
}

const createAreaInService = (newArea) => {
    area.create(newArea)
    return newArea
}

module.exports = {
    getAllAreasInService: getAllAreasInService,
    createAreaInService: createAreaInService
}