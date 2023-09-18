// libraries
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import { editQuestionMutation } from '../../queries/questionQueries'

// css
import '../../css/areaDetails.css'

//icons
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

export const EditQuestion = props => {

  const id = props.areaId

  const queryClient = useQueryClient()

  const initialValues = {
    question_text: '',
    difficulty: '1',
    importance: '1'
  }

  const validationSchema = Yup.object().shape({
    question_text: Yup.string().required('Обавезно поље'),
    difficulty: Yup.number(),
    importance: Yup.number()
  })

  const { mutateAsync: editQuestion } = useMutation(
    editQuestionMutation(queryClient, id)
  )

  const onSubmit = async data => {
    const questionData = { id: props.questionId, formData: data }
    await editQuestion(questionData)
    props.resetState()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className='confirmDeleteOrEditQuestion addQuestionForm'>
        <label className='questionTextChange'>Промени текст питања:</label>
        <ErrorMessage
          name='question_text'
          component='span'
          className='errorMessage'
        />
        <Field name='question_text' />
        <label className='questionTextChange'>Промени тежину питања:</label>
        <ErrorMessage
          name='difficulty'
          component='span'
          className='errorMessage'
        />
        <Field as='select' name='difficulty'>
          <option value='1'>Лако</option>
          <option value='2'>Средње</option>
          <option value='3'>Тешко</option>
        </Field>
        <label className='questionTextChange'>Промени важност питања:</label>
        <ErrorMessage
          name='importance'
          component='span'
          className='errorMessage'
        />
        <Field as='select' name='importance'>
          <option value='1'>Мање</option>
          <option value='2'>Средње</option>
          <option value='3'>Битно</option>
        </Field>
        <div className='confirmButtons'>
          <button type='submit' className='questionButton'>
            <BsFillCheckCircleFill />
          </button>
          <button onClick={props.resetState} className='questionButton'>
            <RxCrossCircled />
          </button>
        </div>
      </Form>
    </Formik>
  )
}
