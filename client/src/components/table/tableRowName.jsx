// libraries
import React from 'react'

// icons
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'

export const TableRowName = props => {
  return (
    <tr {...props.headerGroup.getHeaderGroupProps()}>
      {props.headerGroup.headers.map((column, key) => (
        <th key={key}>
          <div {...column.getHeaderProps(column.getSortByToggleProps())}>
            {column.render('Header')}
          </div>
          <div>{column.canFilter ? column.render('Filter') : null}</div>
        </th>
      ))}
    </tr>
  )
}
