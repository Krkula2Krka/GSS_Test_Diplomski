// libraries
import React from 'react'

// icons
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

// css
import '../../css/getAllAreas.css'

export const DeleteArea = props => {
  return (
    <div className='confirmDeleteOrEditArea'>
      <h1 className='areaConfirmQuestion'>Да ли сте сигурни?</h1>
      <h6 className='areaMessage'>
        Брисањем ове области обрисаћете сва питања везана за ову област и све
        њихове одговаре.
      </h6>
      <div className='confirmButtons'>
        <button
          onClick={props.deleteArea}
          className='areaButton'
        >
          <BsFillCheckCircleFill />
        </button>
        <button
          onClick={props.setDeleteState}
          className='areaButton'
        >
          <RxCrossCircled />
        </button>
      </div>
    </div>
  )
}