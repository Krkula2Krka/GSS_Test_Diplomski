import axios from 'axios'
import toast from 'react-hot-toast'
import { request } from '../utils/axios'
import Cookies from 'js-cookie'

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
    queryFn: () => request({ url: '/logins/shouldInit', method: 'get' }),
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
        request({ url: '/logins/changePassword', method: 'post', data: data }),
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
    mutationFn: () => request({ url: '/logins/saveResults', method: 'post' }),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.save),
    onError: () => {
        toast.remove()
        toast.error('Параметар за чување резултата неуспешно промењен.')
    }
})

export const loginMutation = () => ({
    mutationFn: (data) =>
        axios.post('http://localhost:3001/logins/adminLogin', data),
    onError: () => {
        toast.remove()
        toast.error('Погрешна шифра.')
    }
})

export const logoutMutation = () => ({
    mutationFn: () => request({ url: '/logins/adminLogout', method: 'post' }),
    onSuccess: () => Cookies.remove('accessToken'),
    onError: () => {
        toast.remove()
        toast.error('Грешка са одјављивањем.')
    }
})

export const getSaveResultsQuery = () => ({
    queryKey: queryKeys.save,
    queryFn: () => request({ url: '/logins/saveResults', method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})
