// libraries
import React from 'react'

// icons
import { RiDeleteBin6Fill } from 'react-icons/ri'

// css
import '../../css/getAllUsers.css'

// components
import { GlobalFilter } from './globalFilter'

export const TableHeader = props => {
  return (
    <div className='headerFooter'>
      <div className='addedMargin'>
        <GlobalFilter filter={props.globalFilter} setFilter={props.setGlobalFilter} />
      </div>
      <button
        className='userButton deleteButton'
        onClick={props.deleteUsers}
      >
        <RiDeleteBin6Fill />
      </button>
    </div>
  )
}
