// libraries
import React from 'react'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'

// queries
import { editUserMutation } from '../../../queries/userQueries'

// css
import '../../../css/form.css'

export const EditUser = (props) => {
    const queryClient = useQueryClient()
    const { mutateAsync: editUser } = useMutation(
        editUserMutation(queryClient, props.page)
    )

    const initialValues = {
        GSS_identification: props.GSS_identification,
        first_name: '',
        last_name: '',
        nickname: '',
        user_type: 'корисник'
    }

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('Обавезно поље'),
        last_name: Yup.string().required('Обавезно поље'),
        nickname: Yup.string().required('Обавезно поље')
    })

    const onSubmit = async (data) => {
        await editUser(data)
        props.resetState()
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
            <Form className='formContainer centered'>
                <ErrorMessage
                    name='first_name'
                    component='span'
                    className='errorMessage'
                />
                <Field name='first_name' placeholder='име' />
                <ErrorMessage
                    name='last_name'
                    component='span'
                    className='errorMessage'
                />
                <Field name='last_name' placeholder='презиме' />
                <ErrorMessage
                    name='nickname'
                    component='span'
                    className='errorMessage'
                />
                <Field name='nickname' placeholder='надимак' />
                <label>Тип корисника:</label>
                <Field as='select' name='user_type'>
                    <option value='корисник'>корисник</option>
                    <option value='администратор'>администратор</option>
                </Field>
                <div className='registration-buttons'>
                    <button onClick={props.resetState}>назад</button>
                    <button type='submit'>настави</button>
                </div>
            </Form>
        </Formik>
    )
}
