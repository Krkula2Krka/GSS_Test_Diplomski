// libraries
import React from 'react'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'

// queries
import { addAnswerMutation } from '../../../queries/answerQueries'

// css
import '../../../css/form.css'

export const AddAnswer = (props) => {
    const queryClient = useQueryClient()
    const { mutateAsync: addAnswer } = useMutation(
        addAnswerMutation(queryClient, props.questionId)
    )

    const initialValues = {
        answer_text: '',
        correctness: false,
        question_id: props.questionId
    }

    const validationSchema = Yup.object().shape({
        answer_text: Yup.string().required('Обавезно поље')
    })

    const onSubmit = async (data) => {
        await addAnswer(data)
        props.resetState()
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className="formContainer centered">
                <label>Текст одговора:</label>
                <ErrorMessage
                    name="answer_text"
                    component="span"
                    className="errorMessage"
                />
                <Field name="answer_text" />
                <label>
                    Тачност одговора:
                    <Field type="checkbox" name="correctness" />
                </label>
                <div className="registration-buttons">
                    {props.noBackButton !== true ? (
                        <button onClick={props.resetState}>Назад</button>
                    ) : null}
                    <button type="submit">Настави</button>
                </div>
            </Form>
        </Formik>
    )
}
