// libraries
import React from 'react'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'

// queries
import { editUserMutation } from '../../../queries/userQueries'

// css
import '../../../css/form.css'

export const EditUser = props => {
  const queryClient = useQueryClient()
  const { mutateAsync: editUser } = useMutation(editUserMutation(queryClient))

  const initialValues = {
    GSS_identification: props.GSS_identification,
    first_name: '',
    last_name: '',
    nickname: '',
    user_type: 'user'
  }

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Обавезно поље'),
    last_name: Yup.string().required('Обавезно поље'),
    nickname: Yup.string().required('Обавезно поље')
  })

  const onSubmit = async data => {
    const userData = {
      GSS_identification: props.GSS_identification,
      formData: data
    }
    await editUser(userData)
    props.resetState()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className='formContainer centered'>
        <label>Име:</label>
        <ErrorMessage
          name='first_name'
          component='span'
          className='errorMessage'
        />
        <Field name='first_name' />
        <label>Презиме:</label>
        <ErrorMessage
          name='last_name'
          component='span'
          className='errorMessage'
        />
        <Field name='last_name' />
        <label>Надимак:</label>
        <ErrorMessage
          name='nickname'
          component='span'
          className='errorMessage'
        />
        <Field name='nickname' />
        <label>Тип корисника:</label>
        <Field as='select' name='user_type'>
          <option value='user'>корисник</option>
          <option value='admin'>администратор</option>
          <option value='superadmin'>супер администратор</option>
        </Field>
        <div className='registration-buttons'>
          <button onClick={props.resetState}>Назад</button>
          <button type='submit'>Настави</button>
        </div>
      </Form>
    </Formik>
  )
}