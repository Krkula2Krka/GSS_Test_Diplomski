import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const getQuestionsForArea = id => ({
  queryKey: ['questions', id],
  queryFn: async () => {
    const res = await fetch(`http://localhost:3001/questions/${id}`)
    const data = await res.json()
    return data
  }
})

export const questionsLoader =
  queryClient =>
  async ({ params }) => {
    const query = getQuestionsForArea(params.id)
    return await queryClient.ensureQueryData({
      queryKey: query.queryKey,
      queryFn: query.queryFn
    })
  }

export const AreaDetails = () => {
  
  const { id } = useParams()

  const { data: questions } = useQuery(getQuestionsForArea(id))

  console.log('area details rendered')

  return (
    <div className='table'>
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
