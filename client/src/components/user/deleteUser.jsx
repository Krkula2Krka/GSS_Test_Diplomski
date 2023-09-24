// libraries
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// icons
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

// css
import '../../css/getAllUsers.css'

// queries
import { deleteUserMutation } from '../../queries/userQueries'

export const DeleteUser = props => {

  const queryClient = useQueryClient()

  const { mutateAsync: deleteUser } = useMutation(
    deleteUserMutation(queryClient)
  )

  return (
    <div className='deleteUserContainer'>
      <label className='deleteUserLabel'>
        Да ли сте сигурни да хоћете да обришете корисника?
      </label>
      <div>
        <button
          onClick={async () => {
            await deleteUser(props.GSS_identification)
            props.resetState()
          }}
          className='userButton'
        >
          <BsFillCheckCircleFill />
        </button>
        <button onClick={props.resetState} className='userButton'>
          <RxCrossCircled />
        </button>
      </div>
    </div>
  )
}
