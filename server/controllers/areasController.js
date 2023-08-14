const { getAllAreasInService, createAreaInService } = require('../service/areasService')

const getAllAreasInController = async (req, res) => {
    const areas = await getAllAreasInService()
    res.json(areas)
}

const createAreaInController = async (req, res) => {
    const newArea = req.body
    await createAreaInService(newArea)
    res.json(newArea)
}

module.exports = {
    getAllAreasInController: getAllAreasInController,
    createAreaInController: createAreaInController
}