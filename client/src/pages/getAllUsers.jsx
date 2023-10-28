// libraries
import React, { useMemo, useState } from 'react'
import {
    useMutation,
    useQueryClient,
    useInfiniteQuery,
    useQuery
} from '@tanstack/react-query'

// queries
import {
    getUsersBatchQuery,
    deleteUsersMutation,
    searchUsersQuery,
    getUsersSearchBatchQuery
} from '../queries/userQueries'

// components
import { NoUser } from '../components/table/noItem/noUser'
import { UserTableColumns } from '../components/table/tableColumns/userTableColumns'
import { Table } from '../components/table/table'
import { AddUser } from '../components/table/addItem/addUser'
import { EditUser } from '../components/table/editItem/editUser'
import { ErrorData } from '../components/error/errorData'
import { LoadingData } from '../components/loadingData'

export const GetAllUsers = () => {
    const [form, setForm] = useState(0)
    const [search, setSearch] = useState({})

    const queryClient = useQueryClient()

    const { mutateAsync: deleteUsers } = useMutation(
        deleteUsersMutation(queryClient)
    )

    const { data, fetchNextPage, hasNextPage, isLoading, isError } =
        useInfiniteQuery(getUsersBatchQuery(search))

    const users = useMemo(() => (data ? data.pages.flat(1) : []), [data])

    if (isLoading) return <LoadingData />

    if (isError) return <ErrorData />

    if (users.length === 0) return <NoUser />

    return (
        <>
            {form === 0 ? (
                <Table
                    tableData={users}
                    calledFrom={'users'}
                    tableColumns={UserTableColumns}
                    deleteItems={(users) => deleteUsers(users)}
                    setSearchObject={(object) => setSearch(object)}
                    openAddForm={() => setForm(1)}
                    openEditForm={(userId) => setForm(userId + 2)}
                    update={() => fetchNextPage()}
                    hasMore={hasNextPage}
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
