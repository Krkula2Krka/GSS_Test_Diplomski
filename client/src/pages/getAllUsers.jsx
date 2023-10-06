// libraries
import React from 'react'
import { useQuery } from '@tanstack/react-query'

// queries
import { getAllUsersQuery, deleteUsersMutation } from '../queries/userQueries'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// components
import { NoUser } from '../components/table/noUser'
import { UserTableColumns } from '../components/table/userTableColumns'
import { Table } from '../components/table/table'

export const GetAllUsers = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteUsers } = useMutation(
    deleteUsersMutation(queryClient)
  )

  const { data: users } = useQuery(getAllUsersQuery())

  if (users.length === 0) return <NoUser />

  return (
    <Table
      tableData={users}
      tableColumns={UserTableColumns}
      deleteItems={users => deleteUsers(users)}
    />
  )
}
