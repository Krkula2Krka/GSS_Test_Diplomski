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
  const newArea = req.body
  await createAreaInService(newArea)
  res.json(newArea)
}

const deleteAreaInController = async (req, res) => {
  const id = req.params.id
  await deleteAreaInService(id)
  res.json({ message: `Area with id ${id} deleted` })
}

const getAreaByIdInController = async (req, res) => {
  const id = req.params.id
  const area = await getAreaByIdInService(id)
  res.json(area)
}

const getPageOfAreasInController = async (req, res) => {
  const pageNumber = req.params.pageNumber
  const areas = await getPageOfAreasInService(pageNumber)
  res.json(areas)
}

const editAreaInController = async (req, res) => {
  const id = req.params.id
  const name = req.params.name
  await editAreaInService(id, name)
  res.json({ message: `Area with id ${id} updated` })
}

module.exports = {
  getAllAreasInController: getAllAreasInController,
  createAreaInController: createAreaInController,
  getAreaByIdInController: getAreaByIdInController,
  getPageOfAreasInController: getPageOfAreasInController,
  deleteAreaInController: deleteAreaInController,
  editAreaInController: editAreaInController
}