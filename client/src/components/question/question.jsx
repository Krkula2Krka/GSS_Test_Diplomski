// libraries
import React from 'react'
import { Link } from 'react-router-dom'

// icons
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { FaExclamation } from 'react-icons/fa'

// css
import '../../css/areaDetails.css'

export const Question = props => {
  return (
    <div className='question'>
      <h1 className='questionText'>{props.questionText}</h1>
      <div className='questionButtons'>
        <button onClick={props.setEditState} className='questionButton'>
          <AiFillEdit />
        </button>
        <button onClick={props.setDeleteState} className='questionButton'>
          <RiDeleteBin6Fill />
        </button>
        <Link to={`/questionDetails/${props.questionId}`} className='questionButton'>
          <FaExclamation />
        </Link>
      </div>
    </div>
  )
}
