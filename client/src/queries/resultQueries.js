import toast from 'react-hot-toast'
import axios from 'axios'
import { request } from '../utils/axios'

const queryKeys = {
    results: (id, page) => ['results', id, page],
    count: (id) => ['resultCount', id]
}

export const addResultMutation = (queryClient) => ({
    mutationFn: (data) => axios.post('http://localhost:3001/results', data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['results'] })
        queryClient.invalidateQueries(queryKeys.count)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно чување резултата.')
    }
})

export const getResultsCountQuery = (id) => ({
    queryKey: queryKeys.count(id),
    queryFn: () => request({ url: `/results/count/${id}`, method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})

export const getResultsBatchQuery = (id, page) => ({
    queryKey: queryKeys.results(id, page),
    queryFn: () => request({ url: `/results/${id}/${page}`, method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})
