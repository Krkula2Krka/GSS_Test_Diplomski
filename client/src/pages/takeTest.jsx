import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function TakeTest () {
  const { id } = useParams()
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    window.addEventListener('beforeunload', event => {
      event.preventDefault()
      //axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
      return (event.returnValue = '')
    })
    axios
      .get(`http://localhost:3001/auth/checkLoginForTesting/${id}`)
      .then(response => setLoggedIn(response.data.loggedIn)
      )
  }, [id])
  return <div>
    {loggedIn ? <h1>Улоговани сте</h1> : <h1>Нисте улоговани</h1>}
  </div>
}

export default TakeTest
