// libraries
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// components
import { InfoModal } from '../components/quiz/infoModal'
import { useUnloadConditionally } from '../utils/hooks/useUnloadConditionally'
import { useOnWindowResizeConditionally } from '../utils/hooks/useOnWindowResizeConditionally'
import { useVisibilityChangeConditionally } from '../utils/hooks/useVisibilityChangeConditionally'
import { Quiz } from '../components/quiz/quiz'
import { ErrorData } from '../utils/error/errorData'

// queries
import {
    logoutForTestingMutation,
    checkLoginForTestingQuery
} from '../queries/userQueries'
import { getTestQuestionsQuery } from '../queries/questionQueries'

export const TakeTest = () => {
    const { id } = useParams()

    const [modalOpen, setModalOpen] = useState(true)

    const { data: loggedIn, isError: loggedInError } = useQuery(
        checkLoginForTestingQuery(id)
    )
    const queryClient = useQueryClient()
    const { mutateAsync: logoutForTesting } = useMutation(
        logoutForTestingMutation(id, queryClient)
    )

    const { data: questions, isError: questionsError } = useQuery(
        getTestQuestionsQuery(loggedIn && !modalOpen)
    )

    /*useVisibilityChangeConditionally(async () => {
        await logoutForTesting()
    }, loggedIn)

    useOnWindowResizeConditionally(
        async () => await logoutForTesting(),
        loggedIn
    )*/

    useUnloadConditionally(async () => await logoutForTesting(), loggedIn)

    if (loggedInError || questionsError) return <ErrorData />

    return (
        <div>
            {loggedIn ? (
                <div>
                    {!modalOpen ? (
                        <Quiz questions={[]} />
                    ) : (
                        <InfoModal setOpenModal={setModalOpen} />
                    )}
                </div>
            ) : (
                <div>
                    <h1 className='centered errorPageMessage'>
                        Нисте улоговани
                    </h1>
                </div>
            )}
        </div>
    )
}
