// libraries
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'

// queries
import { getTestResultQuery } from '../queries/resultQueries'

// components
import { ErrorData } from '../utils/error/errorData'

export const TestResult = () => {
    const { id } = useParams()
    const { data, isError } = useQuery(getTestResultQuery(id))

    if (isError) return <ErrorData />
    return <div></div>
}
