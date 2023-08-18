import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate, generatePath } from 'react-router-dom'

function CredentialsForTest () {
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
    axios.post('http://localhost:3001/auth/login', data).then(response => {
      if (response.data.loginSuccessful) {
        navigate(generatePath(`/takeTest/${response.data.id}`))
      }
    })
  }
  return (
    <div>
      <h1>Унесите ваше податке да би сте наставили:</h1>
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
          <button type='submit'>Додај</button>
        </Form>
      </Formik>
      <h1>
        Уколико немате налог кликните{' '}
        <a href='http://localhost:3000/registration'>овде</a> да се
        региструјете!
      </h1>
    </div>
  )
}

export default CredentialsForTest
