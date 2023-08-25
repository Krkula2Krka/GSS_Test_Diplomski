import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LeaveModal from '../components/leaveModal'

function TakeTest () {
  const { id } = useParams()
  const [loggedIn, setLoggedIn] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  useEffect(() => {
    window.onbeforeunload = () => {
      //setModalOpen(true)
      //return ''
      axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
    }
    axios
      .get(`http://localhost:3001/auth/checkLoginForTesting/${id}`)
      .then(response => setLoggedIn(response.data.loggedIn))
    return () => axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
  }, [id])
  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Улоговани сте</h1>
          {modalOpen && <LeaveModal setOpenModal={setModalOpen} />}
        </div>
      ) : (
        <h1>Нисте улоговани</h1>
      )}
    </div>
  )
}

export default TakeTest
