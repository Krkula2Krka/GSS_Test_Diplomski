// libraries
import React, { useEffect, useMemo, useState } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

// queries
import {
    getUsersBatchQuery,
    deleteUsersMutation,
    getUsersCountQuery,
    setSearchInputMutation,
    setPageSizeMutation,
    getPageSizeQuery,
    setStartIdMutation,
    setOperatorMutation,
    resetMutation
} from '../queries/userQueries'

// components
import { UserTableColumns } from '../components/table/tableColumns/userTableColumns'
import { Table } from '../components/table/table'
import { AddUser } from '../components/table/addItem/addUser'
import { EditUser } from '../components/table/editItem/editUser'
import { ErrorData } from '../utils/error/errorData'

// hooks
import { useUnloadConditionally } from '../utils/hooks/useUnloadConditionally'

export const GetAllUsers = () => {
    const [form, setForm] = useState(0)
    const [page, setPage] = useState(0)

    const queryClient = useQueryClient()

    const { mutateAsync: deleteUsers } = useMutation(
        deleteUsersMutation(queryClient, page)
    )

    const { mutateAsync: reset } = useMutation(resetMutation(queryClient))

    const { mutateAsync: setSearchInput } = useMutation(
        setSearchInputMutation(queryClient)
    )

    const { mutateAsync: setStartId } = useMutation(
        setStartIdMutation(queryClient)
    )

    const { mutateAsync: setOperator } = useMutation(
        setOperatorMutation(queryClient)
    )

    const { mutateAsync: setPageSize } = useMutation(
        setPageSizeMutation(queryClient)
    )

    const { data: users, isError: usersError } = useQuery(
        getUsersBatchQuery(page)
    )

    const { data: usersCount, isError: usersCountError } = useQuery(
        getUsersCountQuery()
    )

    const { data: pageSize, isError: pageSizeError } = useQuery(
        getPageSizeQuery()
    )

    useUnloadConditionally(() => reset(), true)

    useEffect(() => {
        return () => reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const searchFields = useMemo(
        () => [
            {
                key: 'GSS_identification',
                display: 'Претражи по ГСС идентификатору:',
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
        [setStartId, setOperator]
    )

    if (usersError || usersCountError || pageSizeError) return <ErrorData />

    return (
        <>
            {form === 0 ? (
                <Table
                    tableData={users !== undefined ? users.data : []}
                    calledFrom='users'
                    tableColumns={UserTableColumns}
                    deleteItems={(users) => deleteUsers(users)}
                    openAddForm={() => setForm(1)}
                    openEditForm={(userId) => setForm(userId + 2)}
                    setPage={setPage}
                    page={page}
                    itemsCount={usersCount !== undefined ? usersCount.data : []}
                    setSearchInput={(search) => setSearchInput(search)}
                    searchFields={searchFields}
                    setPageSize={(pageSize) => setPageSize(pageSize)}
                    pageSize={pageSize !== undefined ? pageSize.data : 30}
                    noRowsMessage='Нема корисника'
                />
            ) : form === 1 ? (
                <AddUser resetState={() => setForm(0)} />
            ) : (
                <EditUser
                    resetState={() => setForm(0)}
                    GSS_identification={form - 2}
                    page={page}
                />
            )}
        </>
    )
}
