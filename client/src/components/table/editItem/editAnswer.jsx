// libraries
import React from 'react'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'

// queries
import { editAnswerMutation } from '../../../queries/answerQueries'

// css
import '../../../css/form.css'

export const EditAnswer = (props) => {
    const queryClient = useQueryClient()
    const { mutateAsync: editAnswer } = useMutation(
        editAnswerMutation(queryClient, props.questionId)
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
        const answerData = {
            id: props.answerId,
            formData: data
        }
        await editAnswer(answerData)
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
                    <button onClick={props.resetState}>Назад</button>
                    <button type="submit">Настави</button>
                </div>
            </Form>
        </Formik>
    )
}
