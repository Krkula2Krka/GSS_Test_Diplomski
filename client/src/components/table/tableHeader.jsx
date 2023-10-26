// libraries
import React, { useState } from 'react'

// icons
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { ImPlus } from 'react-icons/im'
import { AiFillEdit } from 'react-icons/ai'

// css
import '../../css/table.css'

// components
import { Search } from './search'

export const TableHeader = props => {
  const [selectedItems, setSelectedItems] = useState(() => new Set())
  return (
    <div className='header'>
      <Search selectedItems={selectedItems} />
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
        <label key={column.id} className='search-parameter'>
          <div className='search-parameter-text'>{column.Header}</div>
          <input
            type='checkbox'
            onChange={e => {
              if (e.target.checked)
                setSelectedItems(prev => new Set(prev).add(column.id))
              else
                setSelectedItems(prev => {
                  const next = new Set(prev)
                  next.delete(column.id)
                  return next
                })
            }}
          />
        </label>
      ))}
    </div>
  )
}
