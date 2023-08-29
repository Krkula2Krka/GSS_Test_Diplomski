import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, generatePath } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import { Navbar } from '../components/navbar'

export const GetAllAreas =  () => {
  const [areas, setAreas] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3001/areas').then(response => {
      setAreas(response.data)
    })
  }, [])
  return (
    <div className='table'>
      <Navbar />
      {areas.map((area, key) => {
        return (
          <div className='table-row' key={key}>
            <div className='area-name'>
              <h1>{area.area_name}</h1>
            </div>
            <div
              className='edit-area-button'
              onClick={() => {
                navigate(generatePath('/areaDetails/:id', { id: area.id }))
              }}
            >
              <AiIcons.AiFillEdit />
            </div>
          </div>
        )
      })}
    </div>
  )
}