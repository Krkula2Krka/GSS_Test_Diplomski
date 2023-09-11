import React from 'react'
import { Link } from 'react-router-dom'
import '../css/App.css'

export const WrongCredentials = () => {
  return (
    <div className='centered'>
      <h1>Погрешни подаци!</h1>
      <h1>
        Кликните{' '}
        <Link to='/credentialsForTest' className='link'>
          овде
        </Link>{' '}
        да покушате поново!
      </h1>
    </div>
  )
}
