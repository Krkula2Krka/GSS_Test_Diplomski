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

// queries
import { getAllUsersQuery, deleteUsersMutation } from '../queries/userQueries'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
  const [selectedItems, setSelectedItems] = useState(() => new Set())

  const queryClient = useQueryClient()

  const { mutateAsync: deleteUsers } = useMutation(
    deleteUsersMutation(queryClient)
  )

  const { data: users } = useQuery(getAllUsersQuery())

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

  if (users.length === 0) return <NoUser />

  return (
    <div className='tableContainer'>
      <TableHeader
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        deleteUsers={() => {
          const users = Array.from(selectedItems)
          deleteUsers(users)
          setSelectedItems(new Set())
        }}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, key) => (
            <TableRowName headerGroup={headerGroup} key={key} />
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row)
            return (
              <TableRow
                row={row}
                key={key}
                selectID={() =>
                  setSelectedItems(prev =>
                    new Set(prev).add(row.original.GSS_identification)
                  )
                }
                unselectID={() =>
                  setSelectedItems(prev => {
                    const next = new Set(prev)
                    next.delete(row.original.GSS_identification)
                    return next
                  })
                }
                checkIfItemExists={() =>
                  selectedItems.has(row.original.GSS_identification)
                }
                selectMode={() => selectedItems.size !== 0}
              />
            )
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
