import React from 'react'
import { useState } from 'react'

export const TableRow = props => {
    
  const [selected, setSelected] = useState(false)

  return (
    <tr
      key={props.key}
      {...props.row.getRowProps({
        onClick: () => setSelected(!selected)
      })}
    >
      {selected ? (
        <div></div>
      ) : (
        props.row.cells.map((cell, key) => (
          <td key={key} {...cell.getCellProps()}>
            {cell.render('Cell')}
          </td>
        ))
      )}
    </tr>
  )
}
