// libraries
import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'

// queries
import {
    getSaveResultsQuery,
    saveResultsMutation,
    logoutMutation
} from '../../queries/loginQueries'

// components
import { ErrorData } from '../../utils/error/errorData'

export const SaveResultsForm = () => {
    const { data, isError } = useQuery(getSaveResultsQuery())
    const queryClient = useQueryClient()
    const { mutateAsync: saveResults } = useMutation(
        saveResultsMutation(queryClient)
    )

    const navigate = useNavigate()

    const { mutateAsync: logout } = useMutation(logoutMutation())

    const initialValues = {
        save: false
    }

    const onSubmit = async () => {
        await saveResults()
    }

    if (isError) return <ErrorData />

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
            <Form className='formContainer centeredHorizontal form-margin'>
                <label>
                    резултати се чувају{' '}
                    <Field
                        type='checkbox'
                        name='save'
                        checked={
                            data !== undefined
                                ? data.data === true
                                    ? true
                                    : false
                                : false
                        }
                    />
                </label>
                <button type='submit'>промени</button>
                <button
                    type='button'
                    onClick={async () => {
                        await logout()
                        navigate('/')
                    }}
                >
                    одјави се
                </button>
            </Form>
        </Formik>
    )
}
