// libraries
import React from 'react'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'

// queries
import { editQuestionMutation } from '../../../queries/questionQueries'

export const EditQuestion = (props) => {
    const queryClient = useQueryClient()
    const { mutateAsync: editQuestion } = useMutation(
        editQuestionMutation(queryClient, props.areaId, props.page)
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
        const questionData = {
            id: props.questionId,
            formData: data
        }
        await editQuestion(questionData)
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
                <Field as='textarea' name='question_text' />
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
                    <button onClick={props.resetState}>назад</button>
                    <button type='submit'>настави</button>
                </div>
            </Form>
        </Formik>
    )
}
