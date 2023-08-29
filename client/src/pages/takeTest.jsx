import React from 'react'
import { useParams, useLoaderData, useNavigation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { InfoModal } from '../components/infoModal'
import useUnloadConditionally from '../components/hooks/useUnloadConditionally'
import useOnWindowResizeConditionally from '../components/hooks/useOnWindowResizeConditionally'
import useVisibilityChangeConditionally from '../components/hooks/useVisibilityChangeConditionally'
import useDisableBackButtonConditionally from '../components/hooks/useDisableBackButtonConditionally'

export const TakeTest = () => {
  const navigation = useNavigation()
  const { id } = useParams()
  const [loggedIn, setLoggedIn] = useState(useLoaderData())
  const [modalOpen, setModalOpen] = useState(true)

  useDisableBackButtonConditionally(loggedIn)

  useVisibilityChangeConditionally(() => {
    // comment out when in developing phase, but uncommented when in production phase
    //axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
    //setLoggedIn(false)
  }, loggedIn)

  useOnWindowResizeConditionally(() => {
    axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
    setLoggedIn(false)
  }, loggedIn)

  // put given answers andquestions in local storage, then retrive it in mounting phase
  useUnloadConditionally(
    () => axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`),
    loggedIn
  )

  useEffect(() => {
    return () => axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`)
  }, [id])

  if (navigation.state === 'loading') {
    return <div>Loading...</div>
  }

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

export const checkLoginForTesting = async (req, _) => {
  const id = req.params.id
  const res = await fetch(
    `http://localhost:3001/auth/checkLoginForTesting/${id}`
  )
  const data = await res.json()
  return data.loggedIn
}
