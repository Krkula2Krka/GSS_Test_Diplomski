import React from 'react'
import './css/infoModal.css'
import { memo } from 'react'

export const InfoModal = memo(({ setOpenModal }) => {
  return (
    <div>
      <div className='modalBackground'>
        <div className='modalContainer'>
          <div className='title'>
            <h1>Are You Sure You Want to Continue?</h1>
          </div>
          <div className='body'>
            <p>The next page looks amazing. Hope you want to go there!</p>
          </div>
          <div className='footer'>
            <button onClick={() => {setOpenModal(false)}}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})