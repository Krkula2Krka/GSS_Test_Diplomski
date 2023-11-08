// libraries
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'

// css
import '../../css/form.css'

// icons
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'
import { changePasswordMutation } from '../../queries/loginQueries'

export const ChangePassworfForm = () => {
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const { mutateAsync: changePassword } = useMutation(
        changePasswordMutation()
    )
    const initialValues = {
        old_password: '',
        new_password: ''
    }

    const validationSchema = Yup.object().shape({
        old_password: Yup.string().required('Обавезно поље'),
        new_password: Yup.string()
            .required('Обавезно поље')
            .matches(/^\S*$/, 'Шифра не сме да садржи бланко карактере')
            .min(8, 'Шифра мора да садржи макра 8 карактера')
            .test(
                'isValidPass',
                'Шифра мора да садржи макар 1 велико слово, макар 1 мало слово, макар 1 специјални карактер и макар 1 број',
                (value) => {
                    const hasUpperCase = /[A-Z]/.test(value)
                    const hasNumber = /[0-9]/.test(value)
                    const hasLowerCase = /[a-z]/.test(value)
                    const hasSymbole =
                        /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(value)
                    let validConditions = 0
                    const numberOfMustBeValidConditions = 4
                    const conditions = [
                        hasUpperCase,
                        hasLowerCase,
                        hasNumber,
                        hasSymbole
                    ]
                    conditions.forEach((condition) =>
                        condition ? validConditions++ : null
                    )
                    if (validConditions >= numberOfMustBeValidConditions) {
                        return true
                    }
                    return false
                }
            )
    })

    const onSubmit = async (data) => {
        await changePassword(data)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
            <Form className='formContainer centeredHorizontal'>
                <ErrorMessage
                    name='old_password'
                    component='span'
                    className='errorMessage'
                />
                <div className='credentials-form-field'>
                    <Field
                        className='credentials-form-input'
                        type={showOldPassword ? 'text' : 'password'}
                        name='old_password'
                        placeholder='стара шифра'
                    />
                    <button
                        type='button'
                        className='credentials-form-button'
                        onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                        {showOldPassword ? (
                            <AiFillEye />
                        ) : (
                            <AiFillEyeInvisible />
                        )}
                    </button>
                </div>
                <ErrorMessage
                    name='new_password'
                    component='span'
                    className='errorMessage'
                />
                <div className='credentials-form-field'>
                    <Field
                        className='credentials-form-input'
                        type={showNewPassword ? 'text' : 'password'}
                        name='new_password'
                        placeholder='нова шифра'
                    />
                    <button
                        type='button'
                        className='credentials-form-button'
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                        {showNewPassword ? (
                            <AiFillEye />
                        ) : (
                            <AiFillEyeInvisible />
                        )}
                    </button>
                </div>
                <button type='submit'>промени</button>
            </Form>
        </Formik>
    )
}
