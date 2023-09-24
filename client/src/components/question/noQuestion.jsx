// libraries
import React, { useState } from 'react'

// components
import { AddQuestion } from './addQuestion'

export const NoQuestion = () => {
  
  const [buttonClicked, setButtonClicked] = useState(false)

  return (
    <div className='centered'>
      <h1>
        У бази тренутно нема ниједно питање везано за ову област. Кликните{' '}
        <button onClick={() => setButtonClicked(true)} className='noAreaButton'>
          овде
        </button>{' '}
        да додате питање!
      </h1>
      <div className='centeredHorizontal'>
        {buttonClicked ? (
          <AddQuestion
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
