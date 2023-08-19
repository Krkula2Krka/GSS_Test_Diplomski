import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

function TakeTest () {
  const { id } = useParams()
  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault()
      //window.prompt('Напуштање или освежавање ове странице може довести до тога да 
      //Ваши подаци у вези полагања теста не буду замапћени. Да ли сте сигурни да желите да
      //наставите?')
      axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
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
