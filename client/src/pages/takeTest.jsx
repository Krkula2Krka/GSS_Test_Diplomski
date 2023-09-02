import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { InfoModal } from '../components/infoModal'
import useUnloadConditionally from '../components/hooks/useUnloadConditionally'
import useOnWindowResizeConditionally from '../components/hooks/useOnWindowResizeConditionally'
import useVisibilityChangeConditionally from '../components/hooks/useVisibilityChangeConditionally'
import useDisableBackButtonConditionally from '../components/hooks/useDisableBackButtonConditionally'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const TakeTest = () => {
  const { id } = useParams()

  console.log('rendered')

  const queryClient = useQueryClient()
  const { data: loggedIn } = useQuery(checkLoginForTesting(id))

  const { mutateAsync: logoutForTesting } = useMutation({
    mutationFn: () =>
      axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['loggedIn', { id }]),
    onError: () => console.log('error in logoutForTesting mutation')
  })

  const [modalOpen, setModalOpen] = useState(true)

  useDisableBackButtonConditionally(loggedIn)

  useVisibilityChangeConditionally(async () => {
    // comment out when in developing phase, but uncomment when in production phase
    // await logoutForTesting()
  }, loggedIn)

  useOnWindowResizeConditionally(async () => {
    await logoutForTesting()
  }, loggedIn)

  // put given answers andquestions in local storage, then retrive it in mounting phase
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

const checkLoginForTesting = id => ({
  queryKey: ['loggedIn', { id }],
  queryFn: () => {
    return axios
      .get(`http://localhost:3001/auth/checkLoginForTesting/${id}`)
      .then(response => {
        console.log('query ' + response.data.loggedIn)
        return response.data.loggedIn
      })
  }
})

export const loggedInLoader =
  queryClient =>
  async ({ id }) => {
    const query = checkLoginForTesting(id)
    return (
      (await queryClient.getQueryData(query)) ??
      (await queryClient.fetchQuery(query))
    )
  }
