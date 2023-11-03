// libraries
import React, { useMemo, useState } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

// queries
import {
    getUsersBatchQuery,
    deleteUsersMutation,
    getUsersCountQuery,
    setSearchInputMutation,
    setSearchFiltersMutation,
    setPageSizeMutation,
    getPageSizeQuery,
    setStartIdMutation,
    setOperatorMutation
} from '../queries/userQueries'

// components
import { UserTableColumns } from '../components/table/tableColumns/userTableColumns'
import { Table } from '../components/table/table'
import { AddUser } from '../components/table/addItem/addUser'
import { EditUser } from '../components/table/editItem/editUser'
import { ErrorData } from '../components/error/errorData'

export const GetAllUsers = () => {
    const [form, setForm] = useState(0)
    const [page, setPage] = useState(0)

    const queryClient = useQueryClient()

    const { mutateAsync: deleteUsers } = useMutation(
        deleteUsersMutation(queryClient)
    )

    const { mutateAsync: setSearchInput } = useMutation(
        setSearchInputMutation(queryClient)
    )

    const { mutateAsync: setStartId } = useMutation(
        setStartIdMutation(queryClient)
    )

    const { mutateAsync: setOperator } = useMutation(
        setOperatorMutation(queryClient)
    )

    const { mutateAsync: setSearchFilters } = useMutation(
        setSearchFiltersMutation(queryClient)
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

    const searchFields = useMemo(
        () => [
            {
                key: 'user_type',
                display: 'тип корисника',
                type: 'enum',
                values: ['корисник', 'администратор', 'супер администратор']
            },
            {
                key: 'GSS_identification',
                display: 'ГСС број',
                type: 'int'
            }
        ],
        []
    )

    if (usersError || usersCountError || pageSizeError) return <ErrorData />

    return (
        <>
            {form === 0 ? (
                <Table
                    tableData={users}
                    calledFrom={'users'}
                    tableColumns={UserTableColumns}
                    deleteItems={(users) => deleteUsers(users)}
                    openAddForm={() => setForm(1)}
                    openEditForm={(userId) => setForm(userId + 2)}
                    setPage={setPage}
                    page={page}
                    usersCount={usersCount}
                    setSearchInput={(search) => setSearchInput(search)}
                    setSearchFilters={(search) => setSearchFilters(search)}
                    searchFields={searchFields}
                    setPageSize={(pageSize) => setPageSize(pageSize)}
                    pageSize={pageSize}
                    setStartId={(search) => setStartId(search)}
                    setOperator={(operator) => setOperator(operator)}
                />
            ) : form === 1 ? (
                <AddUser resetState={() => setForm(0)} />
            ) : (
                <EditUser
                    resetState={() => setForm(0)}
                    GSS_identification={form - 2}
                />
            )}
        </>
    )
}
