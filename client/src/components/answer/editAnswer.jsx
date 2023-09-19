// libraries
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import { editAnswerMutation } from '../../queries/answerQueries'

// css
import '../../css/questionDetails.css'

//icons
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

export const EditAnswer = props => {
    
  const id = props.questionId

  const queryClient = useQueryClient()

  const initialValues = {
    answer_text: '',
    correctness: false
  }

  const validationSchema = Yup.object().shape({
    answer_text: Yup.string().required('Обавезно поље')
  })

  const { mutateAsync: editAnswer } = useMutation(
    editAnswerMutation(queryClient, id)
  )

  const onSubmit = async data => {
    const answerData = { id: props.answerId, formData: data }
    await editAnswer(answerData)
    props.resetState()
  }

  return (
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
          Да ли је одговор тачан? <Field type='checkbox' name='correctness' />
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
  )
}
