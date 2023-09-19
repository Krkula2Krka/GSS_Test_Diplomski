// libraries
import React, { useState } from 'react'

// components
import { AddAnswer } from './addAnswer'

export const NoAnswer = () => {

  const [buttonClicked, setButtonClicked] = useState(false)

  return (
    <div className='centered'>
      <h1>
        У бази тренутно нема ниједан одговор на ово пирање. Кликните{' '}
        <button onClick={() => setButtonClicked(true)} className='noAnswerButton'>
          овде
        </button>{' '}
        да додате одговор!
      </h1>
      <div className='centeredHorizontal'>
        {buttonClicked ? (
          <AddAnswer
            buttonPressed={200}
            resetState={() => setButtonClicked(false)}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
