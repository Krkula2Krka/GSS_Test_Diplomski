import React from 'react'

// icons
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

// css
import '../../css/areaDetails.css'

export const DeleteQuestion = props => {
  return (
    <div className='confirmDeleteOrEditQuestion'>
      <h1 className='questionConfirmQuestion'>Да ли сте сигурни?</h1>
      <h6 className='questionText'>
        Брисањем овог питања обрисаћете све одговоре везане за ово питање.
      </h6>
      <div className='confirmButtons'>
        <button
          onClick={props.deleteQuestion}
          className='questionButton'
        >
          <BsFillCheckCircleFill />
        </button>
        <button
          onClick={props.setDeleteState}
          className='questionButton'
        >
          <RxCrossCircled />
        </button>
      </div>
    </div>
  )
}