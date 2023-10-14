// libraries
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import { getQuestionsForAreaQuery } from '../queries/questionQueries'
import { deleteQuestionsMutation } from '../queries/questionQueries'

// components
import { NoQuestion } from '../components/table/noItem/noQuestion'
import { QuestionTableColumns } from '../components/table/tableColumns/questionTableColumns'
import { Table } from '../components/table/table'
import { AddQuestion } from '../components/table/addItem/addQuestion'

export const AreaDetails = () => {
  const [form, setForm] = useState(0)
  const { id } = useParams()

  const queryClient = useQueryClient()

  const { mutateAsync: deleteQuestions } = useMutation(
    deleteQuestionsMutation(queryClient, id)
  )

  const { data: questions } = useQuery(getQuestionsForAreaQuery(id))

  if (questions.length === 0) return <NoQuestion />

  return (
    <div>
      {form === 0 ? (
        <Table
          tableData={questions}
          tableColumns={QuestionTableColumns}
          calledFrom={'questions'}
          deleteItems={questions => deleteQuestions(questions)}
          openAddForm={() => setForm(1)}
          openEditForm={() => setForm(2)}
        />
      ) : form === 1 ? (
        <AddQuestion resetState={() => setForm(0)} areaId={id} />
      ) : (
        <div />
      )}
    </div>
  )
}
