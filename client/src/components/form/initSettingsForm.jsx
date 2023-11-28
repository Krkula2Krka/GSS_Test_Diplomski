// libraries
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

// css
import '../../css/form.css'

// queries
import { addLoginMutation } from '../../queries/loginQueries'

// icons
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'

export const InitSettingsForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const queryClient = useQueryClient()
    const { mutateAsync: addLogin } = useMutation(addLoginMutation(queryClient))

    const initialValues = {
        password: ''
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Обавезно поље')
            .matches(/^\S*$/, 'Шифра не сме да садржи бланко карактере')
            .min(8, 'Шифра мора да садржи макар 8 карактера')
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
        await addLogin(data)
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
                    name='password'
                    component='span'
                    className='errorMessage'
                />
                <div className='credentials-form-field'>
                    <Field
                        className='credentials-form-input'
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='постави почетну шифру'
                    />
                    <button
                        type='button'
                        className='credentials-form-button'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </button>
                </div>
                <button type='submit'>настави</button>
            </Form>
        </Formik>
    )
}
