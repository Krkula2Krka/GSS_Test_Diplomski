// libraries
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

// css
import '../../css/form.css'

// icons
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'

export const DbForm = () => {
    const queryClient = useQueryClient()
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const initialValues = {
        password: ''
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Обавезно поље')
    })
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            <Form className='formContainer centered'>
                <div className='credentials-form-field'>
                    <label className='credentials-form-label'>шифра: </label>
                    <div className='credentials-form-input'>
                        <Field
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                        />
                    </div>
                    <button
                        className='credentials-form-button'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </button>
                </div>
                <div className='credentials-form-field'>
                    <ErrorMessage
                        name='password'
                        component='span'
                        className='errorMessage'
                    />
                </div>
                <div className='credentials-form-buttons'>
                    <button onClick={() => navigate('/')}>назад</button>
                    <button type='submit'>настави</button>
                </div>
            </Form>
        </Formik>
    )
}
