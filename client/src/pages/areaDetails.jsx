import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/navbar'

function AreaDetails () {
  const { id } = useParams()
  const [questionObjects, setQuestionObjects] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:3001/questions/${id}`).then(response => {
      setQuestionObjects(response.data)
    })
  }, [id])
  return (
    <div>
      <Navbar />
      {questionObjects.map(questionObject => {
        return <div>{questionObject.question_text}</div>
      })}
    </div>
  )
}

export default AreaDetails
