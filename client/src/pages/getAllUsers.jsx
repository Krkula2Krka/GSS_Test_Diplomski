// libraries
import React, { useMemo, useState } from 'react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination
} from 'react-table'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

// queries
import { getAllUsersQuery } from '../queries/userQueries'

// css
import '../css/getAllUsers.css'

// icons
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { FaHandHoldingMedical } from 'react-icons/fa'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'

// components
import { EditUser } from '../components/user/editUser'
import { DeleteUser } from '../components/user/deleteUser'
import { NoUser } from '../components/user/noUser'
import { GlobalFilter } from '../components/globalFilter'
import { ColumnFilter } from '../components/columnFilter'

export const GetAllUsers = () => {

  const [stateButton, setStateButton] = useState(0)

  const { data: users } = useQuery(getAllUsersQuery())

  const usersArray = [...users]

  const tableData = useMemo(() => users, [users])

  const filterColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    }
  }, [])

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
        Header: 'Администратор',
        accessor: d => (d.admin ? <div>Да</div> : <div>Не</div>)
      },
      {
        Header: 'Дугмићи',
        Cell: ({ cell }) => (
          <div className='userButtons'>
            <button
              className='userButton'
              onClick={() =>
                setStateButton(cell.row.original.GSS_identification)
              }
            >
              <AiFillEdit />
            </button>
            <button
              className='userButton'
              onClick={() =>
                setStateButton(
                  cell.row.original.GSS_identification + 1000000000
                )
              }
            >
              <RiDeleteBin6Fill />
            </button>
            <Link
              to={`/userResults/${cell.row.original.GSS_identification}`}
              className='userButton'
            >
              <FaHandHoldingMedical />
            </Link>
          </div>
        )
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    { columns: tableColumns, data: tableData, defaultColumn: filterColumn },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const { globalFilter, pageIndex } = state

  if (usersArray.length === 0) return <NoUser />

  return (
    <div className='tableContainer'>
      <div className='globalFilter'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, key) => (
                <th key={key}>
                  <div
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    {column.Header !== 'Дугмићи' ? (
                      <span>
                        {column.isSortedDesc ? (
                          <AiOutlineSortDescending />
                        ) : (
                          <AiOutlineSortAscending />
                        )}
                      </span>
                    ) : null}
                  </div>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row)
            return (
              <tr key={key} {...row.getRowProps()}>
                {stateButton === row.original.GSS_identification ? (
                  <td colSpan={6}>
                    <EditUser
                      GSS_identification={row.original.GSS_identification}
                      resetState={() => setStateButton(0)}
                    />
                  </td>
                ) : stateButton - 1000000000 ===
                  row.original.GSS_identification ? (
                  <td colSpan={6}>
                    <DeleteUser
                      GSS_identification={row.original.GSS_identification}
                      resetState={() => setStateButton(0)}
                    />
                  </td>
                ) : (
                  row.cells.map((cell, key) => (
                    <td key={key} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <span>
          {' '}Страна {pageIndex + 1} / {pageOptions.length}
        </span>
      </div>
    </div>
  )
}
