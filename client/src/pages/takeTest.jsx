import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { InfoModal } from '../components/infoModal'
import useUnloadConditionally from '../components/hooks/useUnloadConditionally'
import { useOnWindowResizeConditionally } from '../components/hooks/useOnWindowResizeConditionally'
import useVisibilityChangeConditionally from '../components/hooks/useVisibilityChangeConditionally'
import { useDisableBackButtonConditionally } from '../components/hooks/useDisableBackButtonConditionally'
import {
  logoutForTestingQuery,
  checkLoginForTestingQuery
} from './queries/userQueries'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const TakeTest = () => {

  const { id } = useParams()

  const { data: loggedIn } = useQuery(checkLoginForTestingQuery(id))
  const queryClient = useQueryClient()
  const { mutateAsync: logoutForTesting } = useMutation(
    logoutForTestingQuery(id, queryClient)
  )

  const [modalOpen, setModalOpen] = useState(true)

  useDisableBackButtonConditionally(loggedIn)

  useVisibilityChangeConditionally(async () => {
    await logoutForTesting()
  }, loggedIn)

  useOnWindowResizeConditionally(async () => await logoutForTesting(), loggedIn)

  useUnloadConditionally(async () => await logoutForTesting(), loggedIn)

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
