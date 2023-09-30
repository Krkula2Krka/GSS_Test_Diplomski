import React from 'react'

export const ErrorPage = () => {
  return (
    <div className='centered'>
      <h1>Грешка</h1>
      <button onClick={() => window.location.reload(false)}>
        Покушајте поново
      </button>
    </div>
  )
}
