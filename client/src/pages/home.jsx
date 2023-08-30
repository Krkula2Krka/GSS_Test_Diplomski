import React from 'react'
import { useNavigate, generatePath } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import './css/home.css'

export const Home =  () => {
  const navigate = useNavigate()
  const takeTest = () => navigate(generatePath('/credentialsForTest'))
  return (
    <div>
      <Navbar />
      <button className="homeButton" onClick={takeTest}>Полажи тест</button>
      <button className="homeButton">Вежбање</button>
      <button className="homeButton">Рад са базом</button>
    </div>
  )
}