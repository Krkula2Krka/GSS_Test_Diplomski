// libraries
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

// css
import '../../css/form.css'

// icons
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'

export const DbForm = () => {
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
