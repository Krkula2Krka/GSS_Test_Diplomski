// libraries
import React, { useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

// queries
import {
    deleteAnswersMutation,
    getAnswersBatchQuery,
    getAnswersCountQuery,
    getPageSizeQuery,
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
import { ErrorData } from '../components/error/errorData'
import { LoadingData } from '../components/loadingData'

export const QuestionDetails = () => {
    const [form, setForm] = useState(0)
    const [page, setPage] = useState(0)
    const { id } = useParams()
    const queryClient = useQueryClient()

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

    const {
        data: answers,
        isError: answersError,
        isLoading: answersLoading
    } = useQuery(getAnswersBatchQuery(id, page))

    const {
        data: answersCount,
        isError: answersCountError,
        isLoading: answersCountLoading
    } = useQuery(getAnswersCountQuery(id))

    const {
        data: pageSize,
        isError: pageSizeError,
        isLoading: pageSizeLoading
    } = useQuery(getPageSizeQuery())

    const location = useLocation()

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
                display: 'идентификатор',
                type: 'int'
            }
        ],
        [setCorrectnessFilters]
    )

    if (answersLoading || answersCountLoading || pageSizeLoading)
        return <LoadingData />

    if (answersError || answersCountError || pageSizeError) return <ErrorData />

    return (
        <div>
            {form === 0 ? (
                <div className='cointainer'>
                    <div className='infoContainer'>
                        <h2>{location.state.questionText}</h2>
                        <h2>Тежина: {location.state.difficulty}</h2>
                        <h2>Важност: {location.state.importance}</h2>
                    </div>
                    <Table
                        tableData={answers}
                        tableColumns={AnswerTableColumns}
                        calledFrom='answers'
                        deleteItems={(answers) => deleteAnswers(answers)}
                        openAddForm={() => setForm(1)}
                        openEditForm={(answerId) => setForm(answerId + 2)}
                        searchFields={searchFields}
                        itemsCount={answersCount}
                        pageSize={pageSize}
                        page={page}
                        setPage={setPage}
                        setSearchInput={(search) => setSearchInput(search)}
                        setPageSize={(pageSize) => setPageSize(pageSize)}
                        setStartId={(search) => setStartId(search)}
                        setOperator={(operator) => setOperator(operator)}
                        setCorrectnessFilters={(search) =>
                            setCorrectnessFilters(search)
                        }
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
