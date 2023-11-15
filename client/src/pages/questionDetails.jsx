// libraries
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

// queries
import {
    deleteAnswersMutation,
    getAnswersBatchQuery,
    getAnswersCountQuery,
    getPageSizeQuery,
    resetMutation,
    setCorrectnessFiltersMutation,
    setOperatorMutation,
    setPageSizeMutation,
    setSearchInputMutation,
    setStartIdMutation
} from '../queries/answerQueries'

// css
import '../css/table.css'

// components
import { Table } from '../components/table/table'
import { AnswerTableColumns } from '../components/table/tableColumns/answerTableColumns'
import { AddAnswer } from '../components/table/addItem/addAnswer'
import { EditAnswer } from '../components/table/editItem/editAnswer'
import { ErrorData } from '../utils/error/errorData'

export const QuestionDetails = () => {
    const [form, setForm] = useState(0)
    const [page, setPage] = useState(0)
    const { id } = useParams()
    const queryClient = useQueryClient()

    const { mutateAsync: reset } = useMutation(resetMutation(queryClient))

    const { mutateAsync: deleteAnswers } = useMutation(
        deleteAnswersMutation(queryClient, id, page)
    )

    const { mutateAsync: setSearchInput } = useMutation(
        setSearchInputMutation(queryClient, id)
    )

    const { mutateAsync: setStartId } = useMutation(
        setStartIdMutation(queryClient, id)
    )

    const { mutateAsync: setOperator } = useMutation(
        setOperatorMutation(queryClient, id)
    )

    const { mutateAsync: setCorrectnessFilters } = useMutation(
        setCorrectnessFiltersMutation(queryClient, id)
    )

    const { mutateAsync: setPageSize } = useMutation(
        setPageSizeMutation(queryClient, id)
    )

    const { data: answers, isError: answersError } = useQuery(
        getAnswersBatchQuery(id, page)
    )

    const { data: answersCount, isError: answersCountError } = useQuery(
        getAnswersCountQuery(id)
    )

    const { data: pageSize, isError: pageSizeError } = useQuery(
        getPageSizeQuery()
    )

    const location = useLocation()

    useEffect(() => {
        return () => reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const searchFields = useMemo(
        () => [
            {
                key: 'correctness',
                display: 'Одговор је тачан:',
                type: 'bool',
                values: [false, true],
                filters: (search) =>
                    setCorrectnessFilters({
                        correctness: search
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
                    setOperator({
                        operator: operator
                    })
            }
        ],
        [setCorrectnessFilters, setStartId, setOperator]
    )

    if (answersError || answersCountError || pageSizeError) return <ErrorData />

    return (
        <div>
            {form === 0 ? (
                <div className='cointainer'>
                    <div className='infoContainer'>
                        <h2>
                            {location.state !== null
                                ? location.state.questionText
                                : null}
                        </h2>
                        <h2>
                            Тежина:{' '}
                            {location.state !== null
                                ? location.state.difficulty
                                : null}
                        </h2>
                        <h2>
                            Важност:{' '}
                            {location.state !== null
                                ? location.state.importance
                                : null}
                        </h2>
                    </div>
                    <Table
                        tableData={answers !== undefined ? answers.data : []}
                        tableColumns={AnswerTableColumns}
                        calledFrom='answers'
                        deleteItems={(answers) => deleteAnswers(answers)}
                        openAddForm={() => setForm(1)}
                        openEditForm={(answerId) => setForm(answerId + 2)}
                        searchFields={searchFields}
                        itemsCount={
                            answersCount !== undefined ? answersCount.data : []
                        }
                        pageSize={pageSize !== undefined ? pageSize.data : 30}
                        page={page}
                        setPage={setPage}
                        setSearchInput={(search) => setSearchInput(search)}
                        setPageSize={(pageSize) => setPageSize(pageSize)}
                        noRowsMessage='Нема одговора'
                    />
                </div>
            ) : form === 1 ? (
                <AddAnswer resetState={() => setForm(0)} questionId={id} />
            ) : (
                <EditAnswer
                    resetState={() => setForm(0)}
                    questionId={id}
                    answerId={form - 2}
                    page={page}
                />
            )}
        </div>
    )
}
