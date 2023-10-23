// libraries
import React, { useState } from 'react'
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery
} from '@tanstack/react-query'

// queries
import { getUsersBatchQuery, deleteUsersMutation } from '../queries/userQueries'

// components
import { NoUser } from '../components/table/noItem/noUser'
import { UserTableColumns } from '../components/table/tableColumns/userTableColumns'
import { Table } from '../components/table/table'
import { AddUser } from '../components/table/addItem/addUser'
import { EditUser } from '../components/table/editItem/editUser'

export const GetAllUsers = () => {
  const [form, setForm] = useState(0)

  const queryClient = useQueryClient()

  const { mutateAsync: deleteUsers } = useMutation(
    deleteUsersMutation(queryClient)
  )

  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage
  } = useInfiniteQuery(getUsersBatchQuery())

  const users = data.pages.flat(1)

  if (users.length === 0) return <NoUser />

  return (
    <div>
      {form === 0 ? (
        <div>
          <Table
            tableData={users}
            calledFrom={'users'}
            tableColumns={UserTableColumns}
            deleteItems={users => deleteUsers(users)}
            openAddForm={() => setForm(1)}
            openEditForm={userId => setForm(userId + 2)}
            update={() => fetchNextPage()}
            hasMore={hasNextPage}
          />
          <div>{isFetching ? 'Fetching...' : null}</div>
        </div>
      ) : form === 1 ? (
        <AddUser resetState={() => setForm(0)} />
      ) : (
        <EditUser resetState={() => setForm(0)} GSS_identification={form - 2} />
      )}
    </div>
  )
}
