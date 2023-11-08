import axios from 'axios'
import toast from 'react-hot-toast'

const queryKeys = {
    init: ['init'],
    save: ['save']
}

export const addLoginMutation = (queryClient) => ({
    mutationFn: (data) => axios.post('http://localhost:3001/logins', data),
    onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.init)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно иницилизовање подешавања.')
    }
})

export const shouldInitQuery = () => ({
    queryKey: queryKeys.init,
    queryFn: async () => {
        const res = await fetch('http://localhost:3001/logins/shouldInit')
        return res.json()
    },
    staleTime: Infinity,
    cacheTime: Infinity
})

export const shouldInitLoader = (queryClient) => async () => {
    const query = shouldInitQuery()
    return await queryClient.ensureQueryData({
        queryKey: query.queryKey,
        queryFn: query.queryFn
    })
}

export const changePasswordMutation = () => ({
    mutationFn: (data) =>
        axios.post('http://localhost:3001/logins/changePassword', data),
    onSuccess: () => {
        toast.remove()
        toast.success('Успешно мењање шифре.')
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно мењање шифре.')
    }
})

export const saveResultsMutation = (queryClient) => ({
    mutationFn: () => axios.post('http://localhost:3001/logins/saveResults'),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.save),
    onError: () => {
        toast.remove()
        toast.error('Параметар за чување резултата неуспешно промењен.')
    }
})

export const getSaveResultsQuery = () => ({
    queryKey: queryKeys.save,
    queryFn: async () => {
        const res = await fetch('http://localhost:3001/logins/saveResults')
        return res.json()
    },
    staleTime: Infinity,
    cacheTime: Infinity
})
