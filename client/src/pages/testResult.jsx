// libraries
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

// queries
import { getTestResultQuery } from '../queries/resultQueries'

// components
import { ErrorData } from '../utils/error/errorData'
import { LoadingData } from '../utils/loadingData'

// css
import '../css/takeTest.css'

export const TestResult = () => {
    const [index, setIndex] = useState(0)
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { data, isError, isLoading } = useQuery(getTestResultQuery(id))

    const jsonData =
        data !== undefined ? JSON.parse(data.data.questions_answers) : '[]'

    if (isError) return <ErrorData />
    if (isLoading) return <LoadingData />

    return (
        <div className='result-container centered'>
            <span>{index + 1 + ' / ' + jsonData.length}</span> <br />
            <h2 className='result-h2'>{jsonData[index].question_text}</h2>
            <br />
            <h2 className='result-h2'>
                Изабран одговор: {jsonData[index].answer_text}
            </h2>
            <br />
            {jsonData[index].correctness === true ? (
                <h2 className='result-h2'>Одговор је исправан.</h2>
            ) : (
                <h2 className='result-h2'>Одговор је неисправан.</h2>
            )}
            <div className='result-buttons'>
                {jsonData.map((_, index) => (
                    <button
                        key={index}
                        className='result-button'
                        onClick={() => setIndex(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <br />
            <div className='back-button-container'>
                <button
                    className='back-button'
                    onClick={() => {
                        location.state !== null
                            ? navigate(`/userResults/${location.state.id}`)
                            : navigate(-1)
                    }}
                >
                    назад
                </button>
            </div>
        </div>
    )
}
