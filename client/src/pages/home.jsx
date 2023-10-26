import React from 'react'
import { Link } from 'react-router-dom'
import '../css/home.css'

export const Home = () => {
  return (
    <div className='home-buttons'>
      <Link to='/credentialsForTest' className='homeLink'>
        Полажи тест
      </Link>
      <Link className='homeLink'>Вежбање</Link>
      <Link to='/getAllAreas' className='homeLink'>Рад са базом</Link>
    </div>
  )
}
