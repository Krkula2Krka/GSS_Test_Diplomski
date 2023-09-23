// libraries
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import { editUserMutation } from '../../queries/userQueries'

// css
import '../../css/getAllUsers.css'

//icons
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

export const EditUser = props => {
    
  const queryClient = useQueryClient()

  const initialValues = {
    first_name: '',
    last_name: '',
    nickname: '',
    admin: false
  }

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Обавезно поље'),
    last_name: Yup.string().required('Обавезно поље'),
    nickname: Yup.string().required('Обавезно поље'),
    admin: Yup.bool()
  })

  const { mutateAsync: editUser } = useMutation(editUserMutation(queryClient))

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
      <Form className='confirmDeleteOrEditUser centered'>
        <label className='label'>ГСС број корисника: {props.GSS_identification}</label>
        <label className='label'>Промени име корисника:</label>
        <ErrorMessage
          name='first_name'
          component='span'
          className='errorMessage'
        />
        <Field name='first_name' />
        <label className='label'>Промени презиме корисника:</label>
        <ErrorMessage
          name='last_name'
          component='span'
          className='errorMessage'
        />
        <Field name='last_name' />
        <label className='label'>Промени надимак корисника:</label>
        <ErrorMessage
          name='nickname'
          component='span'
          className='errorMessage'
        />
        <Field name='nickname' />
        <label className='label'>
          Да ли је корисник администратор? <Field type='checkbox' name='admin' />
        </label>
        <div className='confirmButtons'>
          <button type='submit' className='userButton'>
            <BsFillCheckCircleFill />
          </button>
          <button onClick={props.resetState} className='userButton'>
            <RxCrossCircled />
          </button>
        </div>
      </Form>
    </Formik>
  )
}
