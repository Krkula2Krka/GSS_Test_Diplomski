// libraries
import React, { useState } from 'react'

// css
import '../../css/quiz.css'

export const Quiz = props => {
  const [index, setIndex] = useState(0)
  return (
    <div>
      {props.questions?.map(question => (
        <div className='quizQuestion'>
          <h1>{question.question_text}</h1>
        </div>
      ))}
    </div>
  )
}
