import React from 'react'
import { Link } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import { useQuery } from '@tanstack/react-query'

const getAllAreas = () => ({
  queryKey: ['areas'],
  queryFn: async () => {
    const res = await fetch('http://localhost:3001/areas')
    const data = await res.json()
    return data
  }
})

export const areasLoader = queryClient => async () => {
  const query = getAllAreas()
  return await queryClient.ensureQueryData({
    queryKey: query.queryKey,
    queryFn: query.queryFn
  })
}

export const GetAllAreas = () => {

  const { data: areas } = useQuery(getAllAreas())

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
