// libraries
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import { getAllUsersQuery, deleteUsersMutation } from '../queries/userQueries'

// components
import { NoUser } from '../components/table/noUser'
import { UserTableColumns } from '../components/table/userTableColumns'
import { Table } from '../components/table/table'

export const GetAllUsers = () => {
  const [addForm, setAddForm] = useState(0)

  const queryClient = useQueryClient()

  const { mutateAsync: deleteUsers } = useMutation(
    deleteUsersMutation(queryClient)
  )

  const { data: users } = useQuery(getAllUsersQuery())

  if (users.length === 0) return <NoUser />

  return (
    <div>
      {addForm === 0 ? (
        <Table
          tableData={users}
          calledFrom={'users'}
          tableColumns={UserTableColumns}
          deleteItems={users => deleteUsers(users)}
          openAddForm={() => setAddForm(1)}
        />
      ) : (
        <div></div>
      )}
    </div>
  )
}
