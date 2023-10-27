const {
    getAllAreasInService,
    createAreaInService,
    getAreaByIdInService,
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

const getAreaByIdInController = async (req, res) => {
    const area = await getAreaByIdInService(req.params.id)
    res.json(area)
}

const editAreaInController = async (req, res) => {
    await editAreaInService(req.params.id, req.body)
    res.sendStatus(200)
}

module.exports = {
    getAllAreasInController,
    createAreaInController,
    getAreaByIdInController,
    deleteAreaInController,
    editAreaInController
}
