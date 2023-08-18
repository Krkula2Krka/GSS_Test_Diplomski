import React from 'react'
import { useNavigate, generatePath } from 'react-router-dom'

function Home () {
  const navigate = useNavigate()
  const takeTest = () => {
    navigate(generatePath('/credentialsForTest'))
  }
  return (
    <div>
      <button onClick={takeTest}>Полажи тест</button>
      <button>Вежбање</button>
      <button>Рад са базом</button>
    </div>
  )
}

export default Home
