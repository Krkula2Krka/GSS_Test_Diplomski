// libraries
import React from 'react'
import { useQuery } from '@tanstack/react-query'

// queries
import { shouldInitQuery } from '../queries/loginQueries'

// components
import { ErrorData } from '../utils/error/errorData'
import { SaveResultsForm } from '../components/form/saveResultsForm'
import { InitSettingsForm } from '../components/form/initSettingsForm'
import { ChangePassworfForm } from '../components/form/changePassworfForm'

export const Settings = () => {
    const { data, isError: shouldInitError } = useQuery(shouldInitQuery())

    if (shouldInitError) return <ErrorData />

    return (
        <>
            {data.shouldInit === true ? (
                <InitSettingsForm />
            ) : (
                <>
                    <ChangePassworfForm />
                    <SaveResultsForm />
                </>
            )}
        </>
    )
}
