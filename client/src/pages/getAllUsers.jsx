// libraries
import React, { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery(getUsersBatchQuery(), {
    getNextPageParam: (_, pages) => pages.length
  })

  //if (users.length === 0) return <NoUser />

  return (
    <div>
      {form === 0 ? (
        status === 'pending' ? (
          <p>Loading...</p>
        ) : status === 'error' ? (
          <p>Error: {error.message}</p>
        ) : (
          <Table
            tableData={data}
            calledFrom={'users'}
            tableColumns={UserTableColumns}
            deleteItems={users => deleteUsers(users)}
            openAddForm={() => setForm(1)}
            openEditForm={userId => setForm(userId + 2)}
            update={() => {
              if (hasNextPage && !isFetchingNextPage) fetchNextPage()
              else return
            }}
          />
        )
      ) : form === 1 ? (
        <AddUser resetState={() => setForm(0)} />
      ) : (
        <EditUser resetState={() => setForm(0)} GSS_identification={form - 2} />
      )}
    </div>
  )
}
