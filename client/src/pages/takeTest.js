import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

function TakeTest () {
  const { id } = useParams()
  useEffect(() => {
    window.addEventListener('locationchange', function () {
      axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
    })
    window.addEventListener('beforeunload', event => {
      event.preventDefault()
      //axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
      return (event.returnValue = '')
    })
    axios
      .get(`http://localhost:3001/auth/checkLoginForTesting/${id}`)
      .then(response => {
        if (!response.data.loggedIn)
          window.location.href = '/credentialsForTest'
      })
  }, [id])
  return (
    <div>
      <h1>TakeTest</h1>
    </div>
  )
}

export default TakeTest
