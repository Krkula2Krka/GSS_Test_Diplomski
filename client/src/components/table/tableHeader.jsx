// libraries
import React from 'react'

// icons
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { ImPlus } from 'react-icons/im'

// css
import '../../css/table.css'

// components
import { GlobalFilter } from './globalFilter'

export const TableHeader = props => {
  return (
    <div className='headerFooter'>
      <div className='addedMargin'>
        <GlobalFilter
          filter={props.globalFilter}
          setFilter={props.setGlobalFilter}
        />
      </div>
      <button className='userButton deleteButton' onClick={props.deleteItems}>
        <RiDeleteBin6Fill />
      </button>
      <button className='userButton deleteButton' onClick={props.openAddForm}>
        <ImPlus />
      </button>
      {props.allColumns.map(column => (
        <label key={column.id} className='visabilityToggler'>
          <div className='visabilityTogglerText'>{column.Header}</div>
          <input type='checkbox' {...column.getToggleHiddenProps()} />
        </label>
      ))}
    </div>
  )
}
