// libraries
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

// css
import '../css/loginForm.css'

// queries
import { loginForTestingMutation } from '../queries/userQueries'

export const LoginForm = () => {

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const initialValues = {
    GSS_identification: ''
  }

  const { mutateAsync: loginForTesting } = useMutation(
    loginForTestingMutation(queryClient)
  )

  const validationSchema = Yup.object().shape({
    GSS_identification: Yup.number()
      .integer('Број мора бити цео')
      .required('Обавезно поље')
      .min(1, 'Број мора бити позитиван')
  })

  const onSubmit = async data => {
    const res = await loginForTesting(data.GSS_identification)
    if (res.data.loginSuccessful)
      navigate(`/takeTest/${data.GSS_identification}`)
    else {
      if (res.data.alreadyLoggedIn) {
        toast.remove()
        toast.error('Корисник је већ улогован.')
      }
      else {
        toast.remove()
        toast.error('Погрешни подаци. Покушајте поново.')
      }
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className='formContainer centered'>
        <h1>Унесите Ваш ГСС број да би сте наставили:</h1>
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
        <button type='submit'>Настави</button>
        <h1>
          Уколико немате налог кликните да се{' '}
          <Link to='/registration' className='link'>
            овде
          </Link>{' '}
          региструјете!
        </h1>
      </Form>
    </Formik>
  )
}
