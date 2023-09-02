import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const AreaDetails = () => {
  const { id } = useParams()

  const { data: questions, isLoading } = useQuery({
    queryKey: ['questions', { id }],
    queryFn: () => {
      return axios.get(`http://localhost:3001/questions/${id}`)
    }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {questions.data.map(question => {
        return <div key={question.id}>{question.question_text}</div>
      })}
    </div>
  )
}
