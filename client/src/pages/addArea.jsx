import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate, generatePath } from 'react-router-dom'
import { Navbar } from '../components/navbar'

export const AddArea = () => {
  const initialValues = {
    area_name: ''
  }

  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    area_name: Yup.string().required('Обавезно поље')
  })

  const onSubmit = data => {
    axios.post('http://localhost:3001/areas', data).then(response => {
      navigate(generatePath('/getAllAreas'))
    })
  }
  return (
    <div>
      <Navbar />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
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