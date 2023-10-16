// libraries
import React, { useMemo, useState } from 'react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination
} from 'react-table'
import toast from 'react-hot-toast'

// components
import { ColumnFilter } from './columnFilter'
import { TableRow } from './tableRow'
import { TableRowName } from './tableRowName'
import { TableHeader } from './tableHeader'

// css
import '../../css/table.css'

export const Table = props => {
  const [selectedItems, setSelectedItems] = useState(() => new Set())
  const tableData = useMemo(() => props.tableData, [props.tableData])

  const filterColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    }
  }, [])

  const tableColumns = useMemo(() => props.tableColumns, [props.tableColumns])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    allColumns
  } = useTable(
    { columns: tableColumns, data: tableData, defaultColumn: filterColumn },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const { globalFilter } = state

  return (
    <div className='tableContainer'>
      <TableHeader
        globalFilter={globalFilter}
        openAddForm={props.openAddForm}
        openEditForm={() => {
          const items = Array.from(selectedItems)
          if (items.length !== 1) {
            toast.remove()
            toast.error('Један ред мора бити изабран за опцију ажурирања.')
          } else props.openEditForm(items[0])
        }}
        calledFrom={props.calledFrom}
        setGlobalFilter={setGlobalFilter}
        deleteItems={() => {
          const items = Array.from(selectedItems)
          props.deleteItems(items)
          setSelectedItems(new Set())
        }}
        allColumns={allColumns}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, key) => (
            <TableRowName headerGroup={headerGroup} key={key} />
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <TableRow
                row={row}
                key={row.id}
                goto={
                  props.calledFrom === 'users'
                    ? `/userResults/${row.original.GSS_identification}`
                    : props.calledFrom === 'questions'
                    ? `/questionDetails/${row.original.id}`
                    : null
                }
                selectID={() =>
                  setSelectedItems(prev =>
                    new Set(prev).add(
                      props.calledFrom === 'users'
                        ? row.original.GSS_identification
                        : row.original.id
                    )
                  )
                }
                unselectID={() =>
                  setSelectedItems(prev => {
                    const next = new Set(prev)
                    next.delete(
                      props.calledFrom === 'users'
                        ? row.original.GSS_identification
                        : row.original.id
                    )
                    return next
                  })
                }
                checkIfItemExists={() =>
                  selectedItems.has(
                    props.calledFrom === 'users'
                      ? row.original.GSS_identification
                      : row.original.id
                  )
                }
                selectMode={() => selectedItems.size !== 0}
                calledFrom={props.calledFrom}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
