// libraries
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

// css
import '../../css/form.css'

// icons
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'

// queries
import { loginMutation } from '../../queries/loginQueries'

export const DbForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const { mutateAsync: login } = useMutation(loginMutation())

    const initialValues = {
        password: ''
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Обавезно поље')
    })

    const onSubmit = async (data) => {
        const res = await login(data)
        if (res.data.loginSuccessful) navigate('/getAllAreas')
        else {
            toast.remove()
            toast.error('Администратор је већ улогован.')
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
                <div className='credentials-form-field'>
                    <Field
                        className='credentials-form-input'
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='шифра'
                    />
                    <button
                        type='button'
                        className='credentials-form-button'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </button>
                </div>
                <div className='credentials-form-buttons'>
                    <button type='button' onClick={() => navigate('/')}>
                        назад
                    </button>
                    <button type='submit'>настави</button>
                </div>
            </Form>
        </Formik>
    )
}
