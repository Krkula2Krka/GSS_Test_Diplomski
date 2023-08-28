import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import InfoModal from '../components/infoModal'
import useUnloadConditionally from '../components/hooks/useUnloadConditionally'
import useOnWindowResizeConditionally from '../components/hooks/useOnWindowResizeConditionally'
import useVisibilityChangeConditionally from '../components/hooks/useVisibilityChangeConditionally'
import useDisableBackButton from '../components/hooks/useDisableBackButton'

export const TakeTest = () => {
  const { id } = useParams()
  const [loggedIn, setLoggedIn] = useState(false)
  const [modalOpen, setModalOpen] = useState(true)

  useDisableBackButton()

  useVisibilityChangeConditionally(() => {
    // comment out when in developing phase, but uncommented when in production phase
    axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
    setLoggedIn(false)
  }, loggedIn)

  useOnWindowResizeConditionally(() => {
    axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
    setLoggedIn(false)
  }, loggedIn)

  useUnloadConditionally(event => {
    event.preventDefault()
    axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
    event.returnValue = ''
  }, loggedIn)

  useEffect(() => {
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