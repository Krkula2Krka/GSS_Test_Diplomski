import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, generatePath } from 'react-router-dom'

function GetAllAreas () {
  const [areas, setAreas] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3001/areas').then(response => {
      setAreas(response.data)
    })
  }, [])
  return (
    <div>
      {areas.map((area, key) => {
        return (
          <div
            key={key}
            onClick={() => {
                navigate(generatePath('/areaDetails/:id', { id: area.id }))
            }}
          >
            <h1>{area.area_name}</h1>
          </div>
        )
      })}
    </div>
  )
}

export default GetAllAreas
