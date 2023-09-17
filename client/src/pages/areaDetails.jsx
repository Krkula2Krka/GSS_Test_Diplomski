// libraries
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

// queries
import { getQuestionsForAreaQuery } from '../queries/questionQueries'

export const AreaDetails = () => {

  const { id } = useParams()

  const { data: questions } = useQuery(getQuestionsForAreaQuery(id))
  const questionsWithDummyData = [...questions]
  if (questions.length !== 0)
    questionsWithDummyData.push({
      id: -1,
      question_text: 'dummy',
      difficulty: 1,
      importance: 1
    })

  return (
    <div className='areas'>
      <div className='container'>
        <div className='row'>
          {questionsWithDummyData.map((question, key) => {
            return (
              <div className='col-sm-12 col-md-6 col-lg-4' key={key}>
                <h1>{question.question_text}</h1>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
