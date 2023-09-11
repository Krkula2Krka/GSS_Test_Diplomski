import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation , useQueryClient} from '@tanstack/react-query'
import { addAreaMutation } from './queries/areaQueries'

export const AddArea = () => {

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  
  const initialValues = {
    area_name: ''
  }

  const { mutateAsync: addArea } = useMutation(
    addAreaMutation(queryClient)
  )

  const validationSchema = Yup.object().shape({
    area_name: Yup.string().required('Обавезно поље')
  })

  const onSubmit = async data => {
    await addArea(data)
    navigate('/getAllAreas')
  }
  
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer centered'>
          <label>Назив нове области: </label>
          <ErrorMessage
            name='area_name'
            component='span'
            className='errorMessage'
          />
          <Field name='area_name' />
          <button type='submit'>Додај</button>
        </Form>
      </Formik>
    </div>
  )
}