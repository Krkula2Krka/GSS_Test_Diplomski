// libraries
import React, { useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import {
  useMutation,
  useInfiniteQuery,
  useQueryClient
} from '@tanstack/react-query'

// queries
import {
  deleteAnswersMutation,
  getAnswersBatchQuery
} from '../queries/answerQueries'

// css
import '../css/table.css'

// components
import { NoAnswer } from '../components/table/noItem/noAnswer'
import { Table } from '../components/table/table'
import { AnswerTableColumns } from '../components/table/tableColumns/answerTableColumns'
import { AddAnswer } from '../components/table/addItem/addAnswer'
import { EditAnswer } from '../components/table/editItem/editAnswer'

export const QuestionDetails = () => {
  const [form, setForm] = useState(0)
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(getAnswersBatchQuery(id))

  const answers = useMemo(() => data ? data.pages.flat(1) : [], [data])

  const location = useLocation()
  const { questionText, difficulty, importance } = location.state

  const difficultyString = useMemo(() => {
    return difficulty === 'tesko'
      ? 'Питање је тешко.'
      : difficulty === 'srednje'
      ? 'Питање је средње тешко.'
      : 'Питање је лако.'
  }, [difficulty])

  const importanceString = useMemo(() => {
    return importance === 'bitno'
      ? 'Питање је битно.'
      : importance === 'srednje'
      ? 'Питање је средње битно.'
      : 'Питање је мање битно.'
  }, [importance])

  const { mutateAsync: deleteAnswers } = useMutation(
    deleteAnswersMutation(queryClient, id)
  )

  if (answers.length === 0)
    return <NoAnswer resetState={() => setForm(0)} questionId={id} />

  return (
    <div>
      {form === 0 ? (
        <div>
          <div className='infoContainer'>
            <h2>{questionText}</h2>
            <h2>{difficultyString}</h2>
            <h2>{importanceString}</h2>
          </div>
          <Table
            tableData={answers}
            tableColumns={AnswerTableColumns}
            calledFrom={'answers'}
            deleteItems={answers => deleteAnswers(answers)}
            openAddForm={() => setForm(1)}
            openEditForm={answerId => setForm(answerId + 2)}
            update={() => fetchNextPage()}
            hasMore={hasNextPage}
          />
        </div>
      ) : form === 1 ? (
        <AddAnswer resetState={() => setForm(0)} questionId={id} />
      ) : (
        <EditAnswer
          resetState={() => setForm(0)}
          questionId={id}
          answerId={form - 2}
        />
      )}
    </div>
  )
}
