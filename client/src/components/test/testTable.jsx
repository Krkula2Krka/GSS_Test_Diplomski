// libraries
import React from 'react'

// components
import { NoTestQuestion } from './noTestQuestion'

export const TestTable = props => {
  if (props.questions.length === 0) return <NoTestQuestion />
  return <div></div>
}
