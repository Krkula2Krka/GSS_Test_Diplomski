// libraries
import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Formik, Form, Field } from 'formik'

// queries
import {
    getSaveResultsQuery,
    saveResultsMutation
} from '../../queries/loginQueries'

// components
import { ErrorData } from '../error/errorData'

export const SaveResultsForm = () => {
    const { data, isError } = useQuery(getSaveResultsQuery())
    const queryClient = useQueryClient()
    const { mutateAsync: saveResults } = useMutation(
        saveResultsMutation(queryClient)
    )

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
                        checked={data === true ? true : false}
                    />
                </label>
                <button type='submit'>промени</button>
            </Form>
        </Formik>
    )
}
