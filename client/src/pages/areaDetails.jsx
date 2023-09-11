import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getQuestionsForAreaQuery } from './queries/questionQueries'

export const AreaDetails = () => {
  
  const { id } = useParams()

  const { data: questions } = useQuery(getQuestionsForAreaQuery(id))
  console.log(questions)

  return (
    <div className='table centered'>
      {questions.map((question, key) => {
        return (
          <div className='table-row' key={key}>
            <h1>{question.question_text}</h1>
          </div>
        )
      })}
    </div>
  )
}