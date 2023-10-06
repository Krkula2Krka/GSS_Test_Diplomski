// libraries
import React, { useEffect, useMemo } from 'react'
import { useTable, usePagination } from 'react-table'

// css
import '../../css/quiz.css'

// components
import { NoTestQuestion } from './noTestQuestion'

export const Quiz = props => {
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
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    prepareRow
  } = useTable({ columns: tableColumns, data: tableData }, usePagination)

  useEffect(() => setPageSize(1), [setPageSize])

  if (props.questions.length === 0) return <NoTestQuestion />

  return (
    <table {...getTableProps()}>
      <tbody {...getTableBodyProps()}>
        {page.map(row => {
          prepareRow(row)
          return row.cells.map(cell => (
            <div className='centered quizQuestion'>
              <td key={cell.id} {...cell.getCellProps()}>
                {cell.render('Cell')}
              </td>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Претходна
              </button>
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                Следећа
              </button>
            </div>
          ))
        })}
      </tbody>
    </table>
  )
}
