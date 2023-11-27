// libraries
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import {
    getPageSizeQuery,
    getQuestionsBatchQuery,
    getQuestionsCountQuery,
    resetMutation,
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
import { ErrorData } from '../utils/error/errorData'

// css
import '../css/table.css'

export const AreaDetails = () => {
    const [form, setForm] = useState(0)
    const [page, setPage] = useState(0)
    const { id } = useParams()

    const queryClient = useQueryClient()

    const location = useLocation()

    const { mutateAsync: reset } = useMutation(resetMutation(queryClient))

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

    const { data: questions, isError: questionsError } = useQuery(
        getQuestionsBatchQuery(id, page)
    )

    const { data: questionsCount, isError: questionsCountError } = useQuery(
        getQuestionsCountQuery(id)
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
                display: 'По идентификатору:',
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
        [setDifficultyFilters, setImportanceFilters, setStartId, setOperator]
    )

    if (questionsError || questionsCountError || pageSizeError)
        return <ErrorData />

    return (
        <div>
            {form === 0 ? (
                <div className='container'>
                    <div className='infoContainer'>
                        <h2>
                            {location.state !== null
                                ? location.state.areaName
                                : null}
                        </h2>
                    </div>
                    <Table
                        tableData={
                            questions !== undefined ? questions.data : []
                        }
                        tableColumns={QuestionTableColumns}
                        calledFrom='questions'
                        deleteItems={(questions) => deleteQuestions(questions)}
                        openAddForm={() => setForm(1)}
                        openEditForm={(questionId) => setForm(questionId + 2)}
                        searchFields={searchFields}
                        itemsCount={
                            questionsCount !== undefined
                                ? questionsCount.data
                                : 0
                        }
                        pageSize={pageSize !== undefined ? pageSize.data : 30}
                        page={page}
                        setSearchInput={(search) => setSearchInput(search)}
                        setPageSize={(pageSize) => setPageSize(pageSize)}
                        setPage={setPage}
                        noRowsMessage='Нема питања'
                        setDifficultyFilters={(search) =>
                            setDifficultyFilters(search)
                        }
                        setImportanceFilters={(search) =>
                            setImportanceFilters(search)
                        }
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
