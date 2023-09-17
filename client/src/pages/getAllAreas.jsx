// libraries
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import { getAllAreasQuery } from '../queries/areaQueries'

// css
import '../css/getAllAreas.css'

// components
import { AddArea } from '../components/area/addArea'
import { EditArea } from '../components/area/editArea'
import { Area } from '../components/area/area'
import { DeleteArea } from '../components/area/deleteArea'

// queries
import { deleteAreaMutation } from '../queries/areaQueries'
import { NoArea } from '../components/area/noArea'

export const GetAllAreas = () => {

  const [stateButton, setStateButton] = useState(0)

  const queryClient = useQueryClient()

  const { data: areas } = useQuery(getAllAreasQuery())

  const areasWithDummyData = [...areas]
  if (areas.length !== 0)
    areasWithDummyData.push({ id: -1, area_name: 'dummy' })

  const { mutateAsync: deleteArea } = useMutation(
    deleteAreaMutation(queryClient)
  )

  if (areasWithDummyData.length === 0) return <NoArea />

  return (
    <div className='areas'>
      <div className='container'>
        <div className='row'>
          {areasWithDummyData.map((area, key) => {
            return (
              <div className='col-sm-12 col-md-6 col-lg-4' key={key}>
                {key + 1 !== areasWithDummyData.length ? (
                  stateButton !== area.id + 100 && stateButton !== area.id ? (
                    <Area
                      setEditState={() => setStateButton(area.id)}
                      setDeleteState={() => setStateButton(100 + area.id)}
                      areaName={area.area_name}
                      id={area.id}
                    />
                  ) : stateButton > 100 ? (
                    <DeleteArea
                      deleteArea={async () => await deleteArea(area.id)}
                      setDeleteState={() => setStateButton(0)}
                    />
                  ) : (
                    <EditArea
                      id={area.id}
                      resetState={() => setStateButton(0)}
                    />
                  )
                ) : (
                  <AddArea
                    buttonPressed={stateButton}
                    setAddNewAreaState={() => setStateButton(200)}
                    resetState={() => setStateButton(0)}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
