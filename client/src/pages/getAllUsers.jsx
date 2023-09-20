// libraries
import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { useQuery } from '@tanstack/react-query'

// queries
import { getAllNonadminUsersQuery } from '../queries/userQueries'

export const GetAllUsers = () => {

  const { data: users } = useQuery(getAllNonadminUsersQuery())

  const tableData = useMemo(() => users, [])
  const tableColumns = useMemo(() => [
    {
        Header: "Идентификатор",
        accessor: "id"
    },
    {
        Header: "Име",
        accessor: "first_name"
    },
    {
        Header: "Презиме",
        accessor: "last_name"
    },
    {
        Header: "Надимак",
        accessor: "nickname"
    },
    {
        Header: "ГСС код - шифрован",
        accessor: "GSS_identification"
    },
    {
        Header: "Тренутно ради тест",
        accessor: "logged_in_for_testing"
    },
    {
        Header: "Администратор",
        accessor: "admin"
    }
  ], [])

  const table = useTable({columns: tableColumns, data: tableData})

  return (<div></div>)
}
