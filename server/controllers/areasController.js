const 
{ getAllAreasInService,
    createAreaInService, getAreaByIdInService } = require('../service/areasService')

const getAllAreasInController = async (req, res) => {
    const areas = await getAllAreasInService()
    res.json(areas)
}

const createAreaInController = async (req, res) => {
    const newArea = req.body
    await createAreaInService(newArea)
    res.json(newArea)
}

const getAreaByIdInController = async (req, res) => {
    const id = req.params.id
    const area = await getAreaByIdInService(id)
    res.json(area)
}

module.exports = {
    getAllAreasInController: getAllAreasInController,
    createAreaInController: createAreaInController,
    getAreaByIdInController: getAreaByIdInController
}