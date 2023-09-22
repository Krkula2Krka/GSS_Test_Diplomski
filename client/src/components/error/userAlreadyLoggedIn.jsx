// libraries
import React from 'react'
import { Link, useParams } from 'react-router-dom'

// css
import '../../css/App.css'

export const UserAlreadyLoggedIn = () => {

  const { GSS_identification } = useParams()

  return (
    <div className='centered'>
      <h1>Корисник са ГСС бројем {GSS_identification} је у току полагања теста!</h1>
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
