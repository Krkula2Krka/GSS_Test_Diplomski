// libraries
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

// css
import '../../css/form.css'

// queries
import { loginForTestingMutation } from '../../queries/userQueries'

export const LoginForm = () => {
    const initialValues = {
        GSS_identification: '',
        first_name: ''
    }

    const { mutateAsync: loginForTesting } = useMutation(
        loginForTestingMutation()
    )

    const validationSchema = Yup.object().shape({
        GSS_identification: Yup.number()
            .integer('Број мора бити цео')
            .required('Обавезно поље')
            .min(1, 'Број мора бити позитиван'),
        first_name: Yup.string().required('Обавезно поље')
    })

    const onSubmit = async (data) => {
        const res = await loginForTesting(data)
        if (res.data.loginSuccessful)
            window.open(
                `http://localhost:3000/takeTest/${data.GSS_identification}`
            )
        else {
            if (res.data.alreadyLoggedIn) {
                toast.remove()
                toast.error('Корисник је већ улогован.')
            } else {
                toast.remove()
                toast.error('Погрешни подаци. Покушајте поново.')
            }
        }
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
                <label>ГСС број:</label>
                <ErrorMessage
                    name='GSS_identification'
                    component='span'
                    className='errorMessage'
                />
                <Field
                    type='number'
                    name='GSS_identification'
                    onWheel={(e) => e.target.blur()}
                />
                <label>Име:</label>
                <ErrorMessage
                    name='first_name'
                    component='span'
                    className='errorMessage'
                />
                <Field name='first_name' />
                <button type='submit'>Настави</button>
                <h1>
                    Уколико немате налог кликните да се{' '}
                    <Link to='/registration' className='link'>
                        овде
                    </Link>{' '}
                    региструјете!
                </h1>
            </Form>
        </Formik>
    )
}
