// libraries
import React from 'react'

// icons
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { ImPlus } from 'react-icons/im'
import { AiFillEdit } from 'react-icons/ai'

// css
import '../../css/table.css'

// components
import { GlobalFilter } from './globalFilter'

export const TableHeader = props => {
  return (
    <div className='header'>
      <div className='addedMargin'>
        <GlobalFilter
          filter={props.globalFilter}
          setFilter={props.setGlobalFilter}
        />
      </div>
      <button className='userButton' onClick={props.deleteItems}>
        <RiDeleteBin6Fill />
      </button>
      <button className='userButton' onClick={props.openAddForm}>
        <ImPlus />
      </button>
      <button className='userButton' onClick={props.openEditForm}>
        <AiFillEdit />
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
