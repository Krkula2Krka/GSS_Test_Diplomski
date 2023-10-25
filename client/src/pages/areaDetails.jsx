// libraries
import React, { useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import { getQuestionsBatchQuery } from '../queries/questionQueries'
import { deleteQuestionsMutation } from '../queries/questionQueries'

// components
import { NoQuestion } from '../components/table/noItem/noQuestion'
import { QuestionTableColumns } from '../components/table/tableColumns/questionTableColumns'
import { Table } from '../components/table/table'
import { AddQuestion } from '../components/table/addItem/addQuestion'
import { EditQuestion } from '../components/table/editItem/editQuestion'

// css
import '../css/table.css'

export const AreaDetails = () => {
  const [form, setForm] = useState(0)
  const { id } = useParams()

  const queryClient = useQueryClient()

  const location = useLocation()
  const { areaName } = location.state

  const { mutateAsync: deleteQuestions } = useMutation(
    deleteQuestionsMutation(queryClient, id)
  )

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    getQuestionsBatchQuery(id)
  )

  const questions = useMemo(() => data ? data.pages.flat(1) : [], [data])

  if (questions.length === 0)
    return <NoQuestion resetState={() => setForm(0)} areaId={id} />

  return (
    <div>
      {form === 0 ? (
        <div className='cointainer'>
          <div className='infoContainer'>
            <h2>{areaName}</h2>
          </div>
          <Table
            tableData={questions}
            tableColumns={QuestionTableColumns}
            calledFrom={'questions'}
            deleteItems={questions => deleteQuestions(questions)}
            openAddForm={() => setForm(1)}
            openEditForm={questionId => setForm(questionId + 2)}
            update={() => fetchNextPage()}
            hasMore={hasNextPage}
          />
        </div>
      ) : form === 1 ? (
        <AddQuestion resetState={() => setForm(0)} areaId={id} />
      ) : (
        <EditQuestion
          resetState={() => setForm(0)}
          areaId={id}
          questionId={form - 2}
        />
      )}
    </div>
  )
}
