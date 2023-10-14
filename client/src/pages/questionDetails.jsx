// libraries
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// queries
import {
  deleteAnswersMutation,
  getAnswersForQuestionQuery
} from '../queries/answerQueries'

// css
import '../css/table.css'

// components
import { NoAnswer } from '../components/table/noItem/noAnswer'
import { Table } from '../components/table/table'
import { AnswerTableColumns } from '../components/table/tableColumns/answerTableColumns'
import { AddAnswer } from '../components/table/addItem/addAnswer'

export const QuestionDetails = () => {
  const [form, setForm] = useState(0)
  const { id } = useParams()

  const { data: answers } = useQuery(getAnswersForQuestionQuery(id))

  const queryClient = useQueryClient()

  const { mutateAsync: deleteAnswers } = useMutation(
    deleteAnswersMutation(queryClient, id)
  )

  if (answers.length === 0) return <NoAnswer />

  return (
    <div>
      {form === 0 ? (
        <Table
          tableData={answers}
          tableColumns={AnswerTableColumns}
          calledFrom={'answers'}
          deleteItems={answers => deleteAnswers(answers)}
          openAddForm={() => setForm(1)}
          openEditForm={() => setForm(2)}
        />
      ) : form === 1 ? (
        <AddAnswer resetState={() => setForm(0)} questionId={id} />
      ) : (
        <div />
      )}
    </div>
  )
}
