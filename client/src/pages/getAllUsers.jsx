// libraries
import React, { useState } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

// queries
import {
    getUsersBatchQuery,
    deleteUsersMutation,
    getUsersCountQuery,
    setSearchMutation
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

    const { mutateAsync: setSearch } = useMutation(
        setSearchMutation(queryClient)
    )

    const { data: users, isError: usersError } = useQuery(
        getUsersBatchQuery(page)
    )

    const { data: usersCount, isError: usersCountError } = useQuery(
        getUsersCountQuery()
    )

    if (usersError || usersCountError) return <ErrorData />

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
                    setSearch={(search) => setSearch(search)}
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
