// libraries
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useOutletContext } from 'react-router-dom'

// queries
import { getAllUsersQuery, deleteUsersMutation } from '../queries/userQueries'

// components
import { NoUser } from '../components/table/noItem/noUser'
import { UserTableColumns } from '../components/table/tableColumns/userTableColumns'
import { Table } from '../components/table/table'
import { AddUser } from '../components/table/addItem/addUser'
import { EditUser } from '../components/table/editItem/editUser'

export const GetAllUsers = () => {
  const [form, setForm] = useState(0)
  const [setImageSource] = useOutletContext()

  const queryClient = useQueryClient()

  const { mutateAsync: deleteUsers } = useMutation(
    deleteUsersMutation(queryClient)
  )

  useEffect(() => {
    setImageSource('https://ik.imagekit.io/sryl9mezx/getAllUsers.webp')
  }, [setImageSource])

  const { data: users } = useQuery(getAllUsersQuery())

  if (users.length === 0) return <NoUser />

  return (
    <div>
      {form === 0 ? (
        <Table
          tableData={users}
          calledFrom={'users'}
          tableColumns={UserTableColumns}
          deleteItems={users => deleteUsers(users)}
          openAddForm={() => setForm(1)}
          openEditForm={userId => setForm(userId + 2)}
        />
      ) : form === 1 ? (
        <AddUser resetState={() => setForm(0)} />
      ) : (
        <EditUser resetState={() => setForm(0)} GSS_identification={form - 2} />
      )}
    </div>
  )
}
