const {
  getAllAreasInService,
  createAreaInService,
  getAreaByIdInService,
  getPageOfAreasInService,
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

const getPageOfAreasInController = async (req, res) => {
  const areas = await getPageOfAreasInService(req.params.pageNumber)
  res.json(areas)
}

const editAreaInController = async (req, res) => {
  await editAreaInService(req.params.id, req.body)
  res.json()
}

module.exports = {
  getAllAreasInController: getAllAreasInController,
  createAreaInController: createAreaInController,
  getAreaByIdInController: getAreaByIdInController,
  getPageOfAreasInController: getPageOfAreasInController,
  deleteAreaInController: deleteAreaInController,
  editAreaInController: editAreaInController
}