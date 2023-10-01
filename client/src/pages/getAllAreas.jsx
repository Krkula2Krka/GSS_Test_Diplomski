// libraries
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// queries
import { getAllAreasQuery } from '../queries/areaQueries'

// css
import '../css/getAllAreas.css'

// components
import { AddArea } from '../components/area/addArea'
import { EditArea } from '../components/area/editArea'
import { Area } from '../components/area/area'
import { DeleteArea } from '../components/area/deleteArea'
import { NoArea } from '../components/area/noArea'

export const GetAllAreas = () => {
  const [stateButton, setStateButton] = useState(0)

  const { data: areas } = useQuery(getAllAreasQuery())

  const areasWithDummyData = [...areas]
  if (areas.length !== 0)
    areasWithDummyData.push({ id: -1, area_name: 'dummy' })

  if (areasWithDummyData.length === 0) return <NoArea />

  return (
    <div className='areas'>
      <div className='container'>
        <div className='row'>
          {areasWithDummyData.map((area, key) => {
            return (
              <div className='col-sm-12 col-md-6 col-lg-4' key={key}>
                {key + 1 !== areasWithDummyData.length ? (
                  stateButton !== area.id + 1000000000 &&
                  stateButton !== area.id ? (
                    <Area
                      setEditState={() => setStateButton(area.id)}
                      setDeleteState={() =>
                        setStateButton(1000000000 + area.id)
                      }
                      areaName={area.area_name}
                      id={area.id}
                    />
                  ) : stateButton > 1000000000 ? (
                    <DeleteArea
                      id={area.id}
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
                    setAddNewAreaState={() => setStateButton(1000000200)}
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
