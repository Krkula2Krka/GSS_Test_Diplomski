// libraries
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// components
import { useUnloadConditionally } from '../utils/hooks/useUnloadConditionally'
import { useOnWindowResizeConditionally } from '../utils/hooks/useOnWindowResizeConditionally'
import { useVisibilityChangeConditionally } from '../utils/hooks/useVisibilityChangeConditionally'
import { Quiz } from '../components/quiz'
import { ErrorData } from '../utils/error/errorData'
import { LoadingData } from '../utils/loadingData'

// queries
import {
    logoutForTestingMutation,
    checkLoginForTestingQuery
} from '../queries/userQueries'
import { getTestQuestionsQuery } from '../queries/questionQueries'
import { getSaveResultsQuery } from '../queries/loginQueries'
import { addResultMutation } from '../queries/resultQueries'

export const TakeTest = () => {
    const { id } = useParams()

    const { data: loggedIn, isError: loggedInError } = useQuery(
        checkLoginForTestingQuery(id)
    )
    const queryClient = useQueryClient()
    const { mutateAsync: logoutForTesting } = useMutation(
        logoutForTestingMutation(id, queryClient)
    )

    const { mutateAsync: addResult } = useMutation(
        addResultMutation(queryClient)
    )

    const {
        data: save,
        isError: saveError,
        isLoading: saveLoading
    } = useQuery(getSaveResultsQuery())

    const {
        data: questions,
        isError: questionsError,
        isLoading: questionsLoading
    } = useQuery(getTestQuestionsQuery(loggedIn))

    useVisibilityChangeConditionally(async () => {
        await logoutForTesting()
    }, loggedIn)

    useOnWindowResizeConditionally(
        async () => await logoutForTesting(),
        loggedIn
    )

    useUnloadConditionally(async () => await logoutForTesting(), loggedIn)

    if ((questionsLoading || saveLoading) && loggedIn) return <LoadingData />

    if (loggedInError || questionsError || saveError) return <ErrorData />

    return (
        <div>
            {loggedIn ? (
                <Quiz
                    questions={questions}
                    save={save}
                    logoutForTesting={logoutForTesting}
                    addResult={addResult}
                    id={id}
                />
            ) : (
                <h1 className='centered errorPageMessage'>Нисте пријављени</h1>
            )}
        </div>
    )
}
