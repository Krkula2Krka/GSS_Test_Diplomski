import React from 'react'
import { Link } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import { useQuery } from '@tanstack/react-query'
import { getAllAreasQuery } from './queries/areaQueries'

export const GetAllAreas = () => {

  const { data: areas } = useQuery(getAllAreasQuery())

  return (
    <div className='table'>
      {areas.map((area, key) => {
        return (
          <div className='table-row' key={key}>
            <h1>{area.area_name}</h1>
            <Link to={`/areaDetails/${area.id}`} className='edit-area-button'>
              <AiIcons.AiFillEdit />
            </Link>
          </div>
        )
      })}
    </div>
  )
}