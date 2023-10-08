// libraries
import React from 'react'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import toast from 'react-hot-toast'

// queries
import { createUserMutation } from '../../../queries/userQueries'

// css
import '../../../css/loginForm.css'

export const AddUser = props => {
  const queryClient = useQueryClient()
  const { mutateAsync: createUser } = useMutation(
    createUserMutation(queryClient)
  )

  const initialValues = {
    GSS_identification: '',
    first_name: '',
    last_name: '',
    nickname: '',
    user_type: 'user'
  }

  const validationSchema = Yup.object().shape({
    GSS_identification: Yup.number()
      .integer('Број мора бити цео')
      .required('Обавезно поље')
      .min(1, 'Број мора бити позитиван'),
    first_name: Yup.string().required('Обавезно поље'),
    last_name: Yup.string().required('Обавезно поље'),
    nickname: Yup.string().required('Обавезно поље')
  })

  const onSubmit = async data => {
    const res = await createUser(data)
    if (res.data.userExists) {
      toast.remove()
      toast.error(
        `Корисник са ГСС бројем ${data.GSS_identification} већ постоји.`
      )
    } else props.resetState()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className='formContainer centered'>
        <label>ГСС број:</label>
        <ErrorMessage
          name='GSS_identification'
          component='span'
          className='errorMessage'
        />
        <Field
          type='number'
          name='GSS_identification'
          onWheel={e => e.target.blur()}
        />
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
          <option value='user'>
            <label>корисник</label>
          </option>
          <option value='admin'>
            <label>администратор</label>
          </option>
          <option value='superadmin'>
            <label>супер администратор</label>
          </option>
        </Field>
        <div className='registration-buttons'>
          <button onClick={props.resetState}>Назад</button>
          <button type='submit'>Настави</button>
        </div>
      </Form>
    </Formik>
  )
}
