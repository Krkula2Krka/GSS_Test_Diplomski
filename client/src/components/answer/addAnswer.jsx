// libraries
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// queries
import { addAnswerMutation } from '../../queries/answerQueries'

// icons
import { BsPlusCircleFill } from 'react-icons/bs'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

export const AddAnswer = props => {

  const queryClient = useQueryClient()

  const { id } = useParams()

  const { mutateAsync: addAnswer } = useMutation(
    addAnswerMutation(queryClient, id)
  )

  const validationSchema = Yup.object().shape({
    answer_text: Yup.string().required('Обавезно поље')
  })

  const onSubmit = async data => {
    const answerData = {
      answer_text: data.answer_text,
      correctness: data.correctness,
      question_id: id
    }
    await addAnswer(answerData)
    props.resetState()
  }

  const initialValues = {
    answer_text: '',
    correctness: false
  }

  return (
    <div>
      {props.buttonPressed === 1000000200 ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className='confirmDeleteOrEditAnswer'>
            <label className='answerTextChange'>Текст одговора:</label>
            <ErrorMessage
              name='answer_text'
              component='span'
              className='errorMessage'
            />
            <Field name='answer_text' />
            <label className='answerTextChange'>
              Да ли је одговор тачан?{' '}
              <Field type='checkbox' name='correctness' />
            </label>
            <div className='confirmButtons'>
              <button type='submit' className='answerButton'>
                <BsFillCheckCircleFill />
              </button>
              <button onClick={props.resetState} className='answerButton'>
                <RxCrossCircled />
              </button>
            </div>
          </Form>
        </Formik>
      ) : (
        <div className='answer'>
          <button
            onClick={props.setAddNewQuestionState}
            className='answerButton centeredAnswerButton'
          >
            <BsPlusCircleFill />
          </button>
        </div>
      )}
    </div>
  )
}
