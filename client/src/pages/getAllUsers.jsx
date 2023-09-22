// libraries
import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'
import { useQuery } from '@tanstack/react-query'

// queries
import { getAllNonadminUsersQuery } from '../queries/userQueries'

// css
import '../css/getAllUsers.css'

// icons
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { FaHandHoldingMedical } from 'react-icons/fa'

export const GetAllUsers = () => {

  const [stateButton, setStateButton] = useState(0)

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
      },
      {
        Header: 'Дугмићи',
        Cell: () => (
          <div className='userButtons'>
            <button className='userButton'>
              <AiFillEdit />
            </button>
            <button className='userButton'>
              <RiDeleteBin6Fill />
            </button>
            <button className='userButton'>
              <FaHandHoldingMedical />
            </button>
          </div>
        )
      }
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: tableColumns, data: tableData })

  return (
    <div className='tableContainer centeredHorizontal'>
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
                  <td {...cell.getCellProps()} onClick={() => setStateButton(cell.row.id)}>
                    {stateButton === cell.row.id ? <div></div> : cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
