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
import { LoadingData } from '../components/loadingData'

export const GetAllUsers = () => {
    const [form, setForm] = useState(0)
    const [page, setPage] = useState(0)

    const queryClient = useQueryClient()

    const { mutateAsync: deleteUsers } = useMutation(
        deleteUsersMutation(queryClient, page)
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

    const {
        data: users,
        isError: usersError,
        isLoading: usersLoading
    } = useQuery(getUsersBatchQuery(page))

    const {
        data: usersCount,
        isError: usersCountError,
        isLoading: usersCountLoading
    } = useQuery(getUsersCountQuery())

    const {
        data: pageSize,
        isError: pageSizeError,
        isLoading: pageSizeLoading
    } = useQuery(getPageSizeQuery())

    const searchFields = useMemo(
        () => [
            {
                key: 'user_type',
                display: 'Тип корисника:',
                type: 'enum',
                values: ['корисник', 'администратор', 'супер администратор'],
                filters: (search) =>
                    setSearchFilters({
                        search: search
                    })
            },
            {
                key: 'GSS_identification',
                display: 'ГСС број',
                type: 'int'
            }
        ],
        [setSearchFilters]
    )

    if (pageSizeLoading || usersCountLoading || usersLoading)
        return <LoadingData />

    if (usersError || usersCountError || pageSizeError) return <ErrorData />

    return (
        <>
            {form === 0 ? (
                <Table
                    tableData={users}
                    calledFrom='users'
                    tableColumns={UserTableColumns}
                    deleteItems={(users) => deleteUsers(users)}
                    openAddForm={() => setForm(1)}
                    openEditForm={(userId) => setForm(userId + 2)}
                    setPage={setPage}
                    page={page}
                    itemsCount={usersCount}
                    setSearchInput={(search) => setSearchInput(search)}
                    searchFields={searchFields}
                    setPageSize={(pageSize) => setPageSize(pageSize)}
                    pageSize={pageSize}
                    setStartId={(search) => setStartId(search)}
                    setOperator={(operator) => setOperator(operator)}
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
