import toast from 'react-hot-toast'
import { request } from '../utils/axios'

const queryKeys = {
    areas: ['areas'],
    areasPaginated: (pageNumber) => ['areas', pageNumber]
}

export const getAllAreasQuery = () => ({
    queryKey: queryKeys.areas,
    queryFn: () => request({ url: '/areas', method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})

export const areasLoader = (queryClient) => async () => {
    //throw new Error('')
    const query = getAllAreasQuery()
    return await queryClient.ensureQueryData({
        queryKey: query.queryKey,
        queryFn: query.queryFn
    })
}

export const addAreaMutation = (queryClient) => ({
    mutationFn: (data) =>
        request({ url: '/areas', method: 'post', data: data }),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.areas),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно додавање области.')
    }
})

export const deleteAreaMutation = (queryClient) => ({
    mutationFn: (id) => request({ url: `/areas/delete/${id}`, method: 'post' }),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.areas),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно брисање области.')
    }
})

export const editAreaMutation = (queryClient) => ({
    mutationFn: (data) =>
        request({
            url: `/areas/edit/${data.id}`,
            method: 'post',
            data: data.formData
        }),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.areas),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање области.')
    }
})
