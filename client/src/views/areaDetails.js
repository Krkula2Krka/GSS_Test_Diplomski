import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function AreaDetails () {
  const { id } = useParams()
  const [areaObject, setAreaObject] = useState({})
  useEffect(() => {
    axios.get(`http://localhost:3001/areas/${id}`).then(response => {
      setAreaObject(response.data)
    })
  }, [id])
  return <div>{areaObject.area_name}</div>
}

export default AreaDetails
