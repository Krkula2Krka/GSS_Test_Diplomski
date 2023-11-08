// libraries
import React from 'react'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'

// queries
import { addQuestionMutation } from '../../../queries/questionQueries'

// css
import '../../../css/form.css'

export const AddQuestion = (props) => {
    const queryClient = useQueryClient()
    const { mutateAsync: addQuestion } = useMutation(
        addQuestionMutation(queryClient, props.areaId)
    )

    const initialValues = {
        question_text: '',
        difficulty: 'лако',
        importance: 'мање',
        area_id: props.areaId
    }

    const validationSchema = Yup.object().shape({
        question_text: Yup.string().required('Обавезно поље')
    })

    const onSubmit = async (data) => {
        await addQuestion(data)
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
                <label>Текст питања:</label>
                <ErrorMessage
                    name='question_text'
                    component='span'
                    className='errorMessage'
                />
                <Field name='question_text' />
                <label>Тежина питања:</label>
                <Field as='select' name='difficulty'>
                    <option value='лако'>лако</option>
                    <option value='средње'>средње</option>
                    <option value='тешко'>тешко</option>
                </Field>
                <label>Важност питања:</label>
                <Field as='select' name='importance'>
                    <option value='мање'>мање</option>
                    <option value='средње'>средње</option>
                    <option value='битно'>битно</option>
                </Field>
                <div className='registration-buttons'>
                    {props.noBackButton !== true ? (
                        <button onClick={props.resetState}>Назад</button>
                    ) : null}
                    <button type='submit'>Настави</button>
                </div>
            </Form>
        </Formik>
    )
}
