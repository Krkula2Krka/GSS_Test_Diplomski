// libraries
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// queries
import { addQuestionMutation } from '../../queries/questionQueries'

// icons
import { BsPlusCircleFill } from 'react-icons/bs'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

export const AddQuestion = props => {

  const queryClient = useQueryClient()

  const { id } = useParams()

  const { mutateAsync: addQuestion } = useMutation(
    addQuestionMutation(queryClient, id)
  )

  const validationSchema = Yup.object().shape({
    question_text: Yup.string().required('Обавезно поље'),
    difficulty: Yup.number(),
    importance: Yup.number()
  })

  const onSubmit = async data => {
    const questionData = {
      question_text: data.question_text,
      difficulty: data.difficulty,
      area_id: id,
      importance: data.importance
    }
    await addQuestion(questionData)
    props.resetState()
  }

  const initialValues = {
    question_text: '',
    difficulty: '1',
    importance: '1'
  }

  return (
    <div>
      {props.buttonPressed === 200 ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className='confirmDeleteOrEditQuestion addQuestionForm'>
            <label className='questionTextChange'>Текст питања:</label>
            <ErrorMessage
              name='question_text'
              component='span'
              className='errorMessage'
            />
            <Field name='question_text' />
            <label className='questionTextChange'>Тежина питања:</label>
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
            <label className='questionTextChange'>Важност питања:</label>
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
      ) : (
        <div className='question'>
          <button
            onClick={props.setAddNewQuestionState}
            className='questionButton centeredQuestionButton'
          >
            <BsPlusCircleFill />
          </button>
        </div>
      )}
    </div>
  )
}
