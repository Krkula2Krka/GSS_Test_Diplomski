const { area } = require('../models')

const getAllAreasInService = () => {
  const areas = area.findAll()
  return areas
}

const createAreaInService = newArea => {
  area.create(newArea)
}

const deleteAreaInService = id => {
  area.destroy({
    where: {
      id: id
    }
  })
}

const editAreaInService = (id, data) => {
  area.update(
    { area_name: data.area_name },
    {
      where: {
        id: id
      }
    }
  )
}

const getAreaByIdInService = id => {
  const wantedArea = area.findByPk(id)
  return wantedArea
}

module.exports = {
  getAllAreasInService: getAllAreasInService,
  createAreaInService: createAreaInService,
  getAreaByIdInService: getAreaByIdInService,
  deleteAreaInService: deleteAreaInService,
  editAreaInService: editAreaInService
}
