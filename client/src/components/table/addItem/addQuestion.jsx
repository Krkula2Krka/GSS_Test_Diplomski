// libraries
import React from 'react'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'

// queries
import { addQuestionMutation } from '../../../queries/questionQueries'

// css
import '../../../css/form.css'

export const AddQuestion = props => {
  const queryClient = useQueryClient()
  const { mutateAsync: addQuestion } = useMutation(
    addQuestionMutation(queryClient, props.areaId)
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
    await addQuestion(data)
    props.resetState()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className='formContainer centered'>
        <label>Текст пирања:</label>
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
