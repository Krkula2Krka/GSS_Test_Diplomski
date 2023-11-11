const {
    getAllAreasInService,
    createAreaInService,
    deleteAreaInService,
    editAreaInService
} = require('../service/areasService')

const getAllAreasInController = async (_, res) => {
    const areas = await getAllAreasInService()
    res.json(areas)
}

const createAreaInController = async (req, res) => {
    await createAreaInService(req.body)
    res.sendStatus(200)
}

const deleteAreaInController = async (req, res) => {
    await deleteAreaInService(req.params.id)
    res.sendStatus(200)
}

const editAreaInController = async (req, res) => {
    await editAreaInService(req.params.id, req.body)
    res.sendStatus(200)
}

module.exports = {
    getAllAreasInController,
    createAreaInController,
    deleteAreaInController,
    editAreaInController
}
