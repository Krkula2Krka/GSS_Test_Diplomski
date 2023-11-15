// libraries
import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// components
import { ResultTableColumns } from '../components/table/tableColumns/resultTableColumns'
import { Table } from '../components/table/table'
import { ErrorData } from '../utils/error/errorData'

// queries
import {
    getResultsBatchQuery,
    getResultsCountQuery,
    deleteResultsMutation,
    getPageSizeQuery,
    setPageSizeMutation,
    setStartIdMutation,
    setOperatorIdMutation,
    setAquiredPointsMutation,
    setOperatorPointsMutation,
    setTestPassedMutation,
    setDateMutation,
    setOperatorDateMutation,
    resetMutation
} from '../queries/resultQueries'

// css
import '../css/table.css'

export const UserResults = () => {
    const [page, setPage] = useState(0)
    const { GSS_identification } = useParams()
    const location = useLocation()
    const queryClient = useQueryClient()

    const { data: results, isError: resultsError } = useQuery(
        getResultsBatchQuery(GSS_identification, page)
    )

    const { mutateAsync: deleteResults } = useMutation(
        deleteResultsMutation(GSS_identification, queryClient, page)
    )

    const { mutateAsync: setDate } = useMutation(
        setDateMutation(queryClient, GSS_identification)
    )

    const { mutateAsync: setOperatorDate } = useMutation(
        setOperatorDateMutation(queryClient, GSS_identification)
    )

    const { mutateAsync: reset } = useMutation(resetMutation(queryClient))

    const { mutateAsync: setTestPassed } = useMutation(
        setTestPassedMutation(queryClient, GSS_identification)
    )

    const { mutateAsync: setStartId } = useMutation(
        setStartIdMutation(queryClient, GSS_identification)
    )

    const { mutateAsync: setAquiredPoints } = useMutation(
        setAquiredPointsMutation(queryClient, GSS_identification)
    )

    const { mutateAsync: setOperatorId } = useMutation(
        setOperatorIdMutation(queryClient, GSS_identification)
    )

    const { mutateAsync: setOperatorPoints } = useMutation(
        setOperatorPointsMutation(queryClient, GSS_identification)
    )

    const { mutateAsync: setPageSize } = useMutation(
        setPageSizeMutation(queryClient, GSS_identification)
    )

    const { data: resultsCount, isError: resultsCountError } = useQuery(
        getResultsCountQuery(GSS_identification)
    )

    const { data: pageSize, isError: pageSizeError } = useQuery(
        getPageSizeQuery()
    )

    useEffect(() => {
        return () => reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const searchFields = useMemo(
        () => [
            {
                key: 'test_passed',
                display: 'Тест је положен:',
                type: 'bool',
                values: [false, true],
                filters: (search) =>
                    setTestPassed({
                        test_passed: search
                    })
            },
            {
                key: 'id',
                display: 'Претражи по идентификатору:',
                type: 'int',
                filters: (search) =>
                    setStartId({
                        startId: search
                    }),
                operator: (operator) =>
                    setOperatorId({
                        operator: operator
                    })
            },
            {
                key: 'points_acquired',
                display: 'Претражи по освојеним поенима:',
                type: 'int',
                filters: (search) =>
                    setAquiredPoints({
                        aquiredPoints: search
                    }),
                operator: (operator) =>
                    setOperatorPoints({
                        operator: operator
                    })
            },
            {
                key: 'date_of_application',
                display: 'Претражи по датуму полагања:',
                type: 'date',
                filters: (search) =>
                    setDate({
                        date: search
                    }),
                operator: (operator) =>
                    setOperatorDate({
                        operator: operator
                    })
            }
        ],
        [
            setAquiredPoints,
            setStartId,
            setOperatorId,
            setOperatorPoints,
            setTestPassed,
            setDate,
            setOperatorDate
        ]
    )

    if (resultsError || resultsCountError || pageSizeError) return <ErrorData />

    return (
        <div className='cointainer'>
            <div className='infoContainer'>
                <h2>
                    {location.state !== null ? location.state.first_name : null}{' '}
                    {location.state !== null ? location.state.last_name : null}{' '}
                    {location.state !== null ? location.state.nickname : null}
                </h2>
            </div>
            <Table
                tableData={results !== undefined ? results.data : []}
                tableColumns={ResultTableColumns}
                calledFrom='results'
                deleteItems={(results) => deleteResults(results)}
                searchFields={searchFields}
                itemsCount={resultsCount !== undefined ? resultsCount.data : 0}
                pageSize={pageSize !== undefined ? pageSize.data : 30}
                page={page}
                setPageSize={(pageSize) => setPageSize(pageSize)}
                setPage={setPage}
                noRowsMessage='Нема резултата'
            />
        </div>
    )
}
