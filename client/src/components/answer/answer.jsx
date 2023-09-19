// libraries
import React from 'react'

// icons
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'

// css
import '../../css/questionDetails.css'

export const Answer = props => {
  return (
    <div className='answer'>
      <h1 className='answerText'>{props.answerText}</h1>
      <div className='answernButtons'>
        <button onClick={props.setEditState} className='answerButton'>
          <AiFillEdit />
        </button>
        <button onClick={props.setDeleteState} className='answerButton'>
          <RiDeleteBin6Fill />
        </button>
      </div>
    </div>
  )
}
