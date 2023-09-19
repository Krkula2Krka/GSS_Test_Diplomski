// libraries
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

// queries
import { getQuestionsForAreaQuery } from '../queries/questionQueries'

// css
import '../css/areaDetails.css'

// components
import { AddQuestion } from '../components/question/addQuestion'
import { EditQuestion } from '../components/question/editQuestion'
import { Question } from '../components/question/question'
import { DeleteQuestion } from '../components/question/deleteQuestion'
import { NoQuestion } from '../components/question/noQuestion'

export const AreaDetails = () => {

  const [stateButton, setStateButton] = useState(0)

  const { id } = useParams()

  const { data: questions } = useQuery(getQuestionsForAreaQuery(id))
  const questionsWithDummyData = [...questions]
  if (questions.length !== 0)
    questionsWithDummyData.push({
      id: -1,
      question_text: 'dummy',
      difficulty: 1,
      importance: 1,
      area_id: id
    })

  if (questionsWithDummyData.length === 0) return <NoQuestion />

  return (
    <div className='areas'>
      <div className='container'>
        <div className='row'>
          {questionsWithDummyData.map((question, key) => {
            return (
              <div className='col-sm-12 col-md-6 col-lg-4' key={key}>
                {key + 1 !== questionsWithDummyData.length ? (
                  stateButton !== question.id + 100 &&
                  stateButton !== question.id ? (
                    <Question
                      setEditState={() => setStateButton(question.id)}
                      setDeleteState={() => setStateButton(100 + question.id)}
                      questionText={question.question_text}
                      questionId={question.id}
                    />
                  ) : stateButton > 100 ? (
                    <DeleteQuestion
                      areaId={id}
                      questionId={question.id}
                      setDeleteState={() => setStateButton(0)}
                    />
                  ) : (
                    <EditQuestion
                      areaId={id}
                      questionId={question.id}
                      resetState={() => setStateButton(0)}
                    />
                  )
                ) : (
                  <AddQuestion
                    buttonPressed={stateButton}
                    setAddNewQuestionState={() => setStateButton(200)}
                    resetState={() => setStateButton(0)}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
