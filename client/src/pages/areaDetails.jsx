// libraries
import React, { useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import {
    getPageSizeQuery,
    getQuestionsBatchQuery,
    getQuestionsCountQuery,
    setDifficultyFiltersMutation,
    setImportanceFiltersMutation,
    setOperatorMutation,
    setPageSizeMutation,
    setSearchInputMutation,
    setStartIdMutation
} from '../queries/questionQueries'
import { deleteQuestionsMutation } from '../queries/questionQueries'

// components
import { QuestionTableColumns } from '../components/table/tableColumns/questionTableColumns'
import { Table } from '../components/table/table'
import { AddQuestion } from '../components/table/addItem/addQuestion'
import { EditQuestion } from '../components/table/editItem/editQuestion'
import { ErrorData } from '../components/error/errorData'
import { LoadingData } from '../components/loadingData'

// css
import '../css/table.css'

export const AreaDetails = () => {
    const [form, setForm] = useState(0)
    const [page, setPage] = useState(0)
    const { id } = useParams()

    const queryClient = useQueryClient()

    const location = useLocation()
    const { areaName } = location.state

    const { mutateAsync: deleteQuestions } = useMutation(
        deleteQuestionsMutation(queryClient, id, page)
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

    const { mutateAsync: setDifficultyFilters } = useMutation(
        setDifficultyFiltersMutation(queryClient, id)
    )

    const { mutateAsync: setImportanceFilters } = useMutation(
        setImportanceFiltersMutation(queryClient, id)
    )

    const { mutateAsync: setPageSize } = useMutation(
        setPageSizeMutation(queryClient, id)
    )

    const {
        data: questions,
        isError: questionsError,
        isLoading: questionsLoading
    } = useQuery(getQuestionsBatchQuery(id, page))

    const {
        data: questionsCount,
        isError: questionsCountError,
        isLoading: questionsCountLoading
    } = useQuery(getQuestionsCountQuery(id))

    const {
        data: pageSize,
        isError: pageSizeError,
        isLoading: pageSizeLoading
    } = useQuery(getPageSizeQuery())

    const searchFields = useMemo(
        () => [
            {
                key: 'difficulty',
                display: 'Тежина питања:',
                type: 'enum',
                values: ['лако', 'средње', 'тешко'],
                filters: (search) =>
                    setDifficultyFilters({
                        search: search
                    })
            },
            {
                key: 'importance',
                display: 'Важност питања:',
                type: 'enum',
                values: ['мање', 'средње', 'битно'],
                filters: (search) =>
                    setImportanceFilters({
                        search: search
                    })
            },
            {
                key: 'id',
                display: 'идентификатор',
                type: 'int'
            }
        ],
        []
    )

    if (questionsLoading || questionsCountLoading || pageSizeLoading)
        return <LoadingData />

    if (questionsError || questionsCountError || pageSizeError)
        return <ErrorData />

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
                        calledFrom='questions'
                        deleteItems={(questions) => deleteQuestions(questions)}
                        openAddForm={() => setForm(1)}
                        openEditForm={(questionId) => setForm(questionId + 2)}
                        searchFields={searchFields}
                        itemsCount={questionsCount}
                        pageSize={pageSize}
                        page={page}
                        setSearchInput={(search) => setSearchInput(search)}
                        setDifficultyFilters={(search) =>
                            setDifficultyFilters(search)
                        }
                        setImportanceFilters={(search) =>
                            setImportanceFilters(search)
                        }
                        setPageSize={(pageSize) => setPageSize(pageSize)}
                        setStartId={(search) => setStartId(search)}
                        setOperator={(operator) => setOperator(operator)}
                        setPage={setPage}
                        noRowsMessage='Тренутно нема питања за ову област у бази.'
                    />
                </div>
            ) : form === 1 ? (
                <AddQuestion resetState={() => setForm(0)} areaId={id} />
            ) : (
                <EditQuestion
                    resetState={() => setForm(0)}
                    areaId={id}
                    questionId={form - 2}
                    page={page}
                />
            )}
        </div>
    )
}
