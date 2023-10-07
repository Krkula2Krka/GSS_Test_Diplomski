// libraries
import React from 'react'

export const TableRowName = props => {
  return (
    <tr {...props.headerGroup.getHeaderGroupProps()}>
      {props.headerGroup.headers.map(column => (
        <th key={column.id}>
          <div {...column.getHeaderProps(column.getSortByToggleProps())}>
            {column.render('Header')}
          </div>
          <div>{column.canFilter ? column.render('Filter') : null}</div>
        </th>
      ))}
    </tr>
  )
}
