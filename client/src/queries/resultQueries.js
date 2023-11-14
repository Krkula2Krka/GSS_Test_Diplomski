import toast from 'react-hot-toast'
import axios from 'axios'
import { request } from '../utils/axios'

const queryKeys = {
    results: (page) => ['results', page],
    count: ['resultCount']
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
