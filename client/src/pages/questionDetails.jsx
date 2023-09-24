// libraries
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

// queries
import { getAnswersForQuestionQuery } from '../queries/answerQueries'

// css
import '../css/questionDetails.css'

// components
import { NoAnswer } from '../components/answer/noAnswer'
import { AddAnswer } from '../components/answer/addAnswer'
import { Answer } from '../components/answer/answer'
import { DeleteAnswer } from '../components/answer/deleteAnswer'
import { EditAnswer } from '../components/answer/editAnswer'

export const QuestionDetails = () => {

  const [stateButton, setStateButton] = useState(0)

  const { id } = useParams()

  const { data: answers } = useQuery(getAnswersForQuestionQuery(id))
  const answersWithDummyData = [...answers]
  if (answers.length !== 0)
    answersWithDummyData.push({
      id: -1,
      answer_text: 'dummy',
      correctness: false,
      question_id: id
    })

  if (answersWithDummyData.length === 0) return <NoAnswer />

  return (
    <div className='areas'>
      <div className='container'>
        <div className='row'>
          {answersWithDummyData.map((answer, key) => {
            return (
              <div className='col-sm-12 col-md-6 col-lg-4' key={key}>
                {key + 1 !== answersWithDummyData.length ? (
                  stateButton !== answer.id + 1000000000 &&
                  stateButton !== answer.id ? (
                    <Answer
                      setEditState={() => setStateButton(answer.id)}
                      setDeleteState={() => setStateButton(1000000000 + answer.id)}
                      answerText={answer.answer_text}
                      correctness={answer.correctness}
                      answerId={answer.id}
                    />
                  ) : stateButton > 1000000000 ? (
                    <DeleteAnswer
                      questionId={id}
                      answerId={answer.id}
                      setDeleteState={() => setStateButton(0)}
                    />
                  ) : (
                    <EditAnswer
                      questionId={id}
                      answerId={answer.id}
                      resetState={() => setStateButton(0)}
                    />
                  )
                ) : (
                  <AddAnswer
                    buttonPressed={stateButton}
                    setAddNewQuestionState={() => setStateButton(1000000200)}
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
