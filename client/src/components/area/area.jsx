// libraries
import { Link } from 'react-router-dom'
import React from 'react'

// icons
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { FaQuestion } from 'react-icons/fa'

// css
import '../../css/getAllAreas.css'

export const Area = (props) => {
    return (
        <div className="area">
            <h1 className="areaName">{props.areaName}</h1>
            <div className="areaButtons">
                <button onClick={props.setEditState} className="areaButton">
                    <AiFillEdit />
                </button>
                <button onClick={props.setDeleteState} className="areaButton">
                    <RiDeleteBin6Fill />
                </button>
                <Link
                    to={`/areaDetails/${props.id}`}
                    state={{ areaName: props.areaName }}
                    className="areaButton"
                >
                    <FaQuestion />
                </Link>
            </div>
        </div>
    )
}
