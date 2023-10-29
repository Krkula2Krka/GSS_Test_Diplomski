// libraries
import React, { useState } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

// queries
import { getUsersBatchQuery, deleteUsersMutation } from '../queries/userQueries'

// components
import { NoUser } from '../components/table/noItem/noUser'
import {
    UserTableColumns,
    UserTableColumnsAgGrid
} from '../components/table/tableColumns/userTableColumns'
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
        deleteUsersMutation(queryClient)
    )

    const {
        data: users,
        isFetching,
        isLoading,
        isError
    } = useQuery(getUsersBatchQuery(page))

    if (isLoading || isFetching) return <LoadingData />

    if (isError) return <ErrorData />

    if (users.length === 0) return <NoUser />

    return (
        <>
            {form === 0 ? (
                <Table
                    tableData={users}
                    calledFrom={'users'}
                    tableColumns={UserTableColumns}
                    tableColumnsAgGrid={UserTableColumnsAgGrid}
                    deleteItems={(users) => deleteUsers(users)}
                    openAddForm={() => setForm(1)}
                    openEditForm={(userId) => setForm(userId + 2)}
                    nextPage={() => setPage(page + 1)}
                    previousPage={() => setPage(page - 1)}
                    specificPage={(page) => setPage(page)}
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
