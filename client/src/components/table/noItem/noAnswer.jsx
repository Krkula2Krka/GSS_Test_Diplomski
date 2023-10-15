import React from 'react'
import { AddAnswer } from '../addItem/addAnswer'

export const NoAnswer = props => {
  return (
    <div>
      <h1 className='centeredHorizontal'>
        У бази тренутно нема ниједан одговор на ово питање. Додајте први
        одговор.
      </h1>
      <AddAnswer resetState={props.resetState} questionId={props.questionId} />
    </div>
  )
}
