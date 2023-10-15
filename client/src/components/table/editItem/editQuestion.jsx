// libraries
import React from 'react'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'

// queries
import { editQuestionMutation } from '../../../queries/questionQueries'

export const EditQuestion = props => {
  const queryClient = useQueryClient()
  const { mutateAsync: editQuestion } = useMutation(
    editQuestionMutation(queryClient, props.areaId)
  )

  const initialValues = {
    question_text: '',
    difficulty: 'lako',
    importance: 'manje',
    area_id: props.areaId
  }

  const validationSchema = Yup.object().shape({
    question_text: Yup.string().required('Обавезно поље')
  })

  const onSubmit = async data => {
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
          <option value='lako'>лако</option>
          <option value='srednje'>средње</option>
          <option value='tesko'>тешко</option>
        </Field>
        <label>Важност питања:</label>
        <Field as='select' name='importance'>
          <option value='manje'>мање</option>
          <option value='srednje'>средње</option>
          <option value='bitno'>битно</option>
        </Field>
        <div className='registration-buttons'>
          <button onClick={props.resetState}>Назад</button>
          <button type='submit'>Настави</button>
        </div>
      </Form>
    </Formik>
  )
}
