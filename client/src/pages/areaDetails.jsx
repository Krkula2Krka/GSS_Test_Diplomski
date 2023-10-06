// libraries
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

// queries
import { getQuestionsForAreaQuery } from '../queries/questionQueries'

// components
import { NoQuestion } from '../components/table/noQuestion'
import { QuestionTableColumns } from '../components/table/questionTableColumns'
import { Table } from '../components/table/table'

export const AreaDetails = () => {
  const { id } = useParams()

  const { data: questions } = useQuery(getQuestionsForAreaQuery(id))

  if (questions.length === 0) return <NoQuestion />

  return (
    <Table
      tableData={questions}
      tableColumns={QuestionTableColumns}
      deleteItems={data => console.log(data)}
    />
  )
}
