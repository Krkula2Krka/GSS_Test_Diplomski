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
  res.json()
}

const deleteAreaInController = async (req, res) => {
  await deleteAreaInService(req.params.id)
  res.json()
}

const getAreaByIdInController = async (req, res) => {
  const area = await getAreaByIdInService(req.params.id)
  res.json(area)
}

const editAreaInController = async (req, res) => {
  await editAreaInService(req.params.id, req.body)
  res.json()
}

module.exports = {
  getAllAreasInController: getAllAreasInController,
  createAreaInController: createAreaInController,
  getAreaByIdInController: getAreaByIdInController,
  deleteAreaInController: deleteAreaInController,
  editAreaInController: editAreaInController
}