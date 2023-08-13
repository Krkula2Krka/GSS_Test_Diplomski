import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

function addArea () {
  const initialValues = {
    area_name: ''
  }

  const validationSchema = Yup.object().shape({
    area_name: Yup.string().required('Обавезно поље')
  })

  const onSubmit = data => {
    axios.post('http://localhost:3001/areas', data).then(response => {
      console.log('IT WORKED')
    })
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <label>Назив нове области: </label>
          <ErrorMessage name='area_name' component='span' />
          <Field name='area_name' />
          <button type='submit'>Додај</button>
        </Form>
      </Formik>
    </div>
  )
}

export default addArea
