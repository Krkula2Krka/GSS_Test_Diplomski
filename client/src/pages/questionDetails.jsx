// libraries
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

// queries
import { getAnswersForQuestionQuery } from '../queries/answerQueries'

// css
import '../css/table.css'

// components
import { NoAnswer } from '../components/table/noItem/noAnswer'
import { Table } from '../components/table/table'
import { AnswerTableColumns } from '../components/table/tableColumns/answerTableColumns'

export const QuestionDetails = () => {
  const [addForm, setAddForm] = useState(0)
  const { id } = useParams()

  const { data: answers } = useQuery(getAnswersForQuestionQuery(id))

  if (answers.length === 0) return <NoAnswer />

  return (
    <div>
      {addForm === 0 ? (
        <Table
          tableData={answers}
          tableColumns={AnswerTableColumns}
          calledFrom={'answers'}
          //deleteItems={questions => deleteQuestions(questions)}
          openAddForm={() => setAddForm(1)}
        />
      ) : (
        <div />
      )}
    </div>
  )
}
