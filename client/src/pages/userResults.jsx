// libraries
import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

// components
import { ResultTableColumns } from '../components/table/tableColumns/resultTableColumns'
import { Table } from '../components/table/table'
import { ErrorData } from '../utils/error/errorData'

// queries
import {
    getResultsBatchQuery,
    getResultsCountQuery
} from '../queries/resultQueries'

export const UserResults = () => {
    const [page, setPage] = useState(0)
    const { GSS_identification } = useParams()
    const location = useLocation()

    const { data: results, isError: resultsError } = useQuery(
        getResultsBatchQuery(GSS_identification, page)
    )

    const { data: resultsCount, isError: resultsCountError } = useQuery(
        getResultsCountQuery(GSS_identification)
    )

    if (resultsError || resultsCountError) return <ErrorData />

    return (
        <Table
            tableData={results !== undefined ? results.data : []}
            tableColumns={ResultTableColumns}
            calledFrom='results'
            deleteItems={(results) => []}
            searchFields={[]}
            itemsCount={resultsCount !== undefined ? resultsCount.data : 0}
            pageSize={30}
            page={page}
            setPageSize={(pageSize) => {}}
            setStartId={(search) => {}}
            setOperator={(operator) => {}}
            setPage={setPage}
            noRowsMessage='Нема резултата'
        />
    )
}
