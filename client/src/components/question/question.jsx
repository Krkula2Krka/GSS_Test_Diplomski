// libraries
import React from 'react'
import { Link } from 'react-router-dom'

// icons
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { FcAnswers } from 'react-icons/fc'

// css
import '../../css/areaDetails.css'

export const Question = props => {
  return (
    <div className='question'>
      <h1 className='questionText'>{props.questionText}</h1>
      <div className='areaButtons'>
        <button onClick={props.setEditState} className='areaButton'>
          <AiFillEdit />
        </button>
        <button onClick={props.setDeleteState} className='areaButton'>
          <RiDeleteBin6Fill />
        </button>
        <Link className='areaButton'>
          <FcAnswers />
        </Link>
      </div>
    </div>
  )
}
