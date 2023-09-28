// libraries
import React from 'react'

// css
import '../../css/getAllUsers.css'

export const TableFooter = props => {
  return (
    <div className='headerFooter'>
      <button
        className='userButton'
        onClick={props.previousPage}
        disabled={!props.canPreviousPage}
      >
        Претходна
      </button>
      <button
        className='userButton'
        onClick={props.nextPage}
        disabled={!props.canNextPage}
      >
        Следећа
      </button>
      <select
        className='userButton'
        value={props.pageSize}
        onChange={e => props.setPageSize(e.target.value)}
      >
        {[1, 10, 25, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Прикажи {pageSize}
          </option>
        ))}
      </select>
      {[...Array(props.pageLength).keys()].map((page, key) => (
        <button
          key={key}
          className='userButton'
          style={{ color: props.pageIndex === page ? '#1a83ff' : '#f5f5f5' }}
          onClick={() => props.gotoPage(page)}
        >
          {page + 1}
        </button>
      ))}
    </div>
  )
}
