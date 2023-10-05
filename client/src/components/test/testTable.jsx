// libraries
import React, { useEffect, useMemo } from 'react'
import { useTable, usePagination } from 'react-table'

// components
import { NoTestQuestion } from './noTestQuestion'

export const TestTable = props => {
  const tableData = useMemo(() => props.questions, [props.questions])

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Питање',
        accessor: 'question_text'
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    page,
    setPageSize,
    prepareRow
  } = useTable({ columns: tableColumns, data: tableData }, usePagination)


  useEffect(() => {
    setPageSize(1)
  }, [setPageSize])

  if (props.questions.length === 0) return <NoTestQuestion />
  return (
    <table {...getTableProps()}>
      <tbody {...getTableBodyProps()}>
        {page.map(row => {
          prepareRow(row)
          return props.row.cells.map((cell, key) => (
            <td key={row.id} {...cell.getCellProps()}>
              {cell.render('Cell')}
            </td>
          ))
        })}
      </tbody>
    </table>
  )
}
