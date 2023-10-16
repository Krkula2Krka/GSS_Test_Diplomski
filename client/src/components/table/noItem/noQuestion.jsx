import React from 'react'
import { AddQuestion } from '../addItem/addQuestion'

export const NoQuestion = props => {
  return (
    <div className='centered'>
      <h1>У бази тренутно нема ниједно питање везано за ову област.</h1>
      <AddQuestion resetState={props.resetState} areaId={props.areaId} />
    </div>
  )
}
