import React from 'react'
import { useNavigate, generatePath } from 'react-router-dom'
import './css/home.css'

export const Home =  ({children}) => {
  const navigate = useNavigate()
  const takeTest = () => navigate(generatePath('/credentialsForTest'))
  return (
    <div>
      {children}
      <button className="homeButton" onClick={takeTest}>Полажи тест</button>
      <button className="homeButton">Вежбање</button>
      <button className="homeButton">Рад са базом</button>
    </div>
  )
}