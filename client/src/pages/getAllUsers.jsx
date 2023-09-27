// libraries
import React, { useMemo } from 'react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination
} from 'react-table'
import { useQuery } from '@tanstack/react-query'

// queries
import { getAllUsersQuery } from '../queries/userQueries'

// css
import '../css/getAllUsers.css'

// components
import { NoUser } from '../components/user/noUser'
import { ColumnFilter } from '../components/table/columnFilter'
import { TableRow } from '../components/table/tableRow'
import { TableColumns } from '../components/table/tableColumns'
import { TableRowName } from '../components/table/tableRowName'
import { TableHeader } from '../components/table/tableHeader'
import { TableFooter } from '../components/table/tableFooter'

export const GetAllUsers = () => {
  const { data: users } = useQuery(getAllUsersQuery())

  const usersArray = [...users]

  const tableData = useMemo(() => users, [users])

  const filterColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    }
  }, [])

  const tableColumns = useMemo(() => TableColumns, [])

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
    gotoPage,
    setPageSize,
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

  const { globalFilter, pageIndex, pageSize } = state

  if (usersArray.length === 0) return <NoUser />

  return (
    <div className='tableContainer'>
      <TableHeader
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <TableRowName headerGroup={headerGroup} />
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row)
            return <TableRow row={row} key={key} />
          })}
        </tbody>
      </table>
      <TableFooter
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageLength={pageOptions.length}
        pageIndex={pageIndex}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        nextPage={() => nextPage()}
        previousPage={() => previousPage()}
        gotoPage={page => gotoPage(page)}
      />
    </div>
  )
}
