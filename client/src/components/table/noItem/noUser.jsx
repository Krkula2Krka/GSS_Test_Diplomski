import React from 'react'
import { AddUser } from '../addItem/addUser'

export const NoUser = props => {
  return (
    <div className='centered'>
      <h1>У бази тренутно нема корисника.</h1>
      <AddUser resetState={props.resetState} />
    </div>
  )
}
