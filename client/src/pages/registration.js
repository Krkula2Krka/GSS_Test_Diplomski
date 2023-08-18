import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate, generatePath } from 'react-router-dom'

function Registration () {
  const navigate = useNavigate()
  const initialValues = {
    first_name: '',
    last_name: '',
    nickname: '',
    GSS_identification: ''
  }
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Обавезно поље'),
    last_name: Yup.string().required('Обавезно поље'),
    nickname: Yup.string().required('Обавезно поље'),
    GSS_identification: Yup.string().required('Обавезно поље')
  })
  const onSubmit = data => {
    axios.post('http://localhost:3001/auth', data).then(response => {
      navigate(generatePath('/home'))
    })
  }
  return (
    <div>
      <h1>Регистрација</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className='formContainer'>
          <label>Име: </label>
          <ErrorMessage
            name='first_name'
            component='span'
            className='errorMessage'
          />
          <Field name='first_name' />
          <label>Презиме: </label>
          <ErrorMessage
            name='last_name'
            component='span'
            className='errorMessage'
          />
          <Field name='last_name' />
          <label>Надимак: </label>
          <ErrorMessage
            name='nickname'
            component='span'
            className='errorMessage'
          />
          <Field name='nickname' />
          <label>ГСС број: </label>
          <ErrorMessage
            name='GSS_identification'
            component='span'
            className='errorMessage'
          />
          <Field name='GSS_identification' />
          <button type='submit'>Региструј се</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registration
