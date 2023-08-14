const { area } = require('../models')

const getAllAreasInService = () => {
    const areas = area.findAll()
    return areas
}

const createAreaInService = (newArea) => {
    area.create(newArea)
    return newArea
}

const getAreaByIdInService = (id) => {
    const wantedArea = area.findByPk(id)
    return wantedArea
}

module.exports = {
    getAllAreasInService: getAllAreasInService,
    createAreaInService: createAreaInService,
    getAreaByIdInService: getAreaByIdInService
}