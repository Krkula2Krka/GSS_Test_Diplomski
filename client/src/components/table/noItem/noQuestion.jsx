import React from 'react'
import { AddQuestion } from '../addItem/addQuestion'

export const NoQuestion = props => {
  return (
    <div>
      <h1 className='centeredHorizontal errorPageMessage'>У бази тренутно нема ниједно питање везано за ову област.</h1>
      <AddQuestion noBackButton={true} areaId={props.areaId} />
    </div>
  )
}
