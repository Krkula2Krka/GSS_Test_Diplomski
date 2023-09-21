import React from 'react'
import { Link, useParams } from 'react-router-dom'
import '../../css/App.css'

export const UserAlreadyExists = () => {

  const { GSS_identification } = useParams() 
  return (
    <div className='centered'>
      <h1>Корисник са ГСС бројем {GSS_identification} већ постоји!</h1>
      <h1>
        Кликните{' '}
        <Link to='/registration' className='link'>
          овде
        </Link>{' '}
        да покушате поново!
      </h1>
    </div>
  )
}