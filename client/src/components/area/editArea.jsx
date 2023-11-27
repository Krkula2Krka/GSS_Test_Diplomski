// libraries
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import { editAreaMutation } from '../../queries/areaQueries'

// css
import '../../css/getAllAreas.css'

//icons
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

export const EditArea = (props) => {
    const queryClient = useQueryClient()

    const initialValues = {
        area_name: ''
    }

    const validationSchema = Yup.object().shape({
        area_name: Yup.string().required('Обавезно поље')
    })

    const { mutateAsync: editArea } = useMutation(editAreaMutation(queryClient))

    const onSubmit = async (data) => {
        const areaData = { id: props.id, formData: data }
        await editArea(areaData)
        props.resetState()
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className='confirmDeleteOrEditArea'>
                <label className='areaNameChange'>Промени назив области:</label>
                <ErrorMessage
                    name='area_name'
                    component='span'
                    className='errorMessage'
                />
                <Field name='area_name' />
                <div class='confirm-buttons-container'>
                    <div className='confirmButtons'>
                        <button type='submit' className='areaButton'>
                            <BsFillCheckCircleFill />
                        </button>
                        <button
                            onClick={props.resetState}
                            className='areaButton'
                        >
                            <RxCrossCircled />
                        </button>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}
