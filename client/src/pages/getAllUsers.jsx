// libraries
import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { useQuery } from '@tanstack/react-query'

// queries
import { getAllNonadminUsersQuery } from '../queries/userQueries'

// css
import '../css/getAllUsers.css'

export const GetAllUsers = () => {

  const { data: users } = useQuery(getAllNonadminUsersQuery())

  const tableData = useMemo(() => users, [users])
  const tableColumns = useMemo(
    () => [
      {
        Header: 'ГСС број',
        accessor: 'GSS_identification'
      },
      {
        Header: 'Име',
        accessor: 'first_name'
      },
      {
        Header: 'Презиме',
        accessor: 'last_name'
      },
      {
        Header: 'Надимак',
        accessor: 'nickname'
      }
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: tableColumns, data: tableData })

  return (
    <div className='centered'>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
