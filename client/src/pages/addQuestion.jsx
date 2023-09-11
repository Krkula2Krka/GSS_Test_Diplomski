import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate, generatePath } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAllAreasQuery } from './queries/areaQueries'

export const AddQuestion = () => {
  
  const { data: areas } = useQuery(getAllAreasQuery())

  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    question_text: Yup.string().required('Обавезно поље'),
    difficulty: Yup.number(),
    area_id: Yup.number(),
    importance: Yup.number()
  })

  const onSubmit = data => {
    axios.post('http://localhost:3001/questions', data).then(response => {
      navigate(generatePath('/'))
    })
  }

  const initialValues = {
    question_text: '',
    difficulty: '1',
    area_id: '1',
    importance: '1'
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className='formContainer centered'>
          <label>Текст питања: </label>
          <ErrorMessage
            name='question_text'
            component='span'
            className='errorMessage'
          />
          <Field name='question_text' />
          <label>Тежина питања: </label>
          <ErrorMessage
            name='difficulty'
            component='span'
            className='errorMessage'
          />
          <Field as='select' name='difficulty'>
            <option value='1'>Лако</option>
            <option value='2'>Средње</option>
            <option value='3'>Тешко</option>
          </Field>
          <label>Област: </label>
          <ErrorMessage
            name='area_id'
            component='span'
            className='errorMessage'
          />
          <Field as='select' name='area_id'>
            {areas.map(({ id, area_name }) => (
              <option key={id} value={id}>
                {area_name}
              </option>
            ))}
          </Field>
          <label>Важност питања: </label>
          <ErrorMessage
            name='importance'
            component='span'
            className='errorMessage'
          />
          <Field as='select' name='importance'>
            <option value='1'>Мање</option>
            <option value='2'>Средње</option>
            <option value='3'>Битно</option>
          </Field>
          <button type='submit'>Додај</button>
        </Form>
      </Formik>
    </div>
  )
}