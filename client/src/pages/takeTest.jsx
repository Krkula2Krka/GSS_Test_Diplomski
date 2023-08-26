import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import InfoModal from '../components/infoModal'

function TakeTest () {
  const { id } = useParams()
  const [loggedIn, setLoggedIn] = useState(false)
  const [modalOpen, setModalOpen] = useState(true)

  useEffect(() => {
    const handleBeforeUnload = () => {
      axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
      return ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    axios
      .get(`http://localhost:3001/auth/checkLoginForTesting/${id}`)
      .then(response => setLoggedIn(response.data.loggedIn))
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
    }
  }, [id])
  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Улоговани сте</h1>
          {modalOpen && <InfoModal setOpenModal={setModalOpen} />}
        </div>
      ) : (
        <div>
          <h1>Нисте улоговани</h1>
        </div>
      )}
    </div>
  )
}

export default TakeTest
