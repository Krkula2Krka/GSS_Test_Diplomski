// libraries
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import { addAreaMutation } from '../../queries/areaQueries'

// icons
import { BsPlusCircleFill } from 'react-icons/bs'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

// css
import '../../css/getAllAreas.css'

export const AddArea = props => {
  
  const queryClient = useQueryClient()

  const initialValues = {
    area_name: ''
  }

  const { mutateAsync: addArea } = useMutation(addAreaMutation(queryClient))

  const validationSchema = Yup.object().shape({
    area_name: Yup.string().required('Обавезно поље')
  })

  const onSubmit = async data => {
    await addArea(data)
    props.resetState()
  }

  return (
    <div>
      {props.buttonPressed === 1000000200 ? (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className='confirmDeleteOrEditArea'>
            <label className='areaNameChange'>Назив нове области:</label>
            <ErrorMessage
              name='area_name'
              component='span'
              className='errorMessage'
            />
            <Field name='area_name' />
            <div className='confirmButtons'>
              <button type='submit' className='areaButton'>
                <BsFillCheckCircleFill />
              </button>
              <button onClick={props.resetState} className='areaButton'>
                <RxCrossCircled />
              </button>
            </div>
          </Form>
        </Formik>
      ) : (
        <div className='area centeredAreaButton'>
          <button onClick={props.setAddNewAreaState} className='areaButton single-area-button'>
            <BsPlusCircleFill />
          </button>
        </div>
      )}
    </div>
  )
}
