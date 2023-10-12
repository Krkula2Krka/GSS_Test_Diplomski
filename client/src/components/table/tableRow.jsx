// libraries
import React from 'react'
import { useNavigate } from 'react-router-dom'

// css
import '../../css/table.css'

export const TableRow = props => {
  const navigate = useNavigate()

  const itemExists = props.checkIfItemExists()
  let startPress = null

  return (
    <tr
      {...props.row.getRowProps({
        onMouseDown: () => (startPress = Date.now()),
        onMouseUp: () => {
          if (Date.now() - startPress > 300) {
            if (!itemExists) props.selectID()
            else props.unselectID()
          } else {
            if (props.selectMode()) {
              if (!itemExists) props.selectID()
              else props.unselectID()
            } else {
              navigate(props.goto)
            }
          }
        }
      })}
    >
      {itemExists
        ? props.row.cells.map((cell, key) => (
            <td className='selected' key={key} {...cell.getCellProps()}>
              {cell.render('Cell')}
            </td>
          ))
        : props.row.cells.map((cell, key) => (
            <td key={key} {...cell.getCellProps()}>
              {cell.render('Cell')}
            </td>
          ))}
    </tr>
  )
}
