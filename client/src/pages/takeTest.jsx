import React, { useState } from 'react'
import { InfoModal } from '../components/infoModal'
import useUnloadConditionally from '../components/hooks/useUnloadConditionally'
import { useOnWindowResizeConditionally } from '../components/hooks/useOnWindowResizeConditionally'
import useVisibilityChangeConditionally from '../components/hooks/useVisibilityChangeConditionally'
import {
  logoutForTestingMutation,
  checkLoginForTestingQuery
} from '../queries/userQueries'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllAreasPaginatedQuery } from '../queries/areaQueries'
import { useParams } from 'react-router-dom'

export const TakeTest = () => {
  const { id } = useParams()

  const [modalOpen, setModalOpen] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)

  const { data: loggedIn } = useQuery(checkLoginForTestingQuery(id))
  const queryClient = useQueryClient()
  const { mutateAsync: logoutForTesting } = useMutation(
    logoutForTestingMutation(id, queryClient)
  )
  const { data: areas } = useQuery(
    getAllAreasPaginatedQuery(pageNumber, loggedIn && !modalOpen)
  )

  useVisibilityChangeConditionally(async () => {
    await logoutForTesting()
  }, loggedIn)

  useOnWindowResizeConditionally(async () => await logoutForTesting(), loggedIn)

  useUnloadConditionally(async () => await logoutForTesting(), loggedIn)

  return (
    <div>
      {loggedIn ? (
        <div>
          {!modalOpen ? (
            <div className='table centered'>
              {areas?.map((area, key) => {
                return (
                  <div className='table-row' key={key}>
                    <h1>{area.area_name}</h1>
                  </div>
                )
              })}
              <button
                onClick={() => setPageNumber(pageNumber => pageNumber - 1)}
                disabled={pageNumber === 1}
              >
                Previous
              </button>
              <button
                onClick={() => setPageNumber(pageNumber => pageNumber + 1)}
                disabled={pageNumber === 16}
              >
                Next
              </button>
            </div>
          ) : (
            <InfoModal setOpenModal={setModalOpen} />
          )}
        </div>
      ) : (
        <div>
          <h1>Нисте улоговани</h1>
        </div>
      )}
    </div>
  )
}
