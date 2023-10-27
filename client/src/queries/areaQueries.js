import axios from 'axios'
import toast from 'react-hot-toast'

const queryKeys = {
    areas: ['areas'],
    areasPaginated: (pageNumber) => ['areas', pageNumber]
}

export const getAllAreasQuery = () => ({
    queryKey: queryKeys.areas,
    queryFn: async () => {
        const res = await fetch('http://localhost:3001/areas')
        const data = await res.json()
        return data
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30
})

export const areasLoader = (queryClient) => async () => {
    const query = getAllAreasQuery()
    return await queryClient.ensureQueryData({
        queryKey: query.queryKey,
        queryFn: query.queryFn
    })
}

export const addAreaMutation = (queryClient) => ({
    mutationFn: (data) => axios.post('http://localhost:3001/areas', data),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.areas),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно додавање области.')
    }
})

export const deleteAreaMutation = (queryClient) => ({
    mutationFn: (id) => axios.post(`http://localhost:3001/areas/delete/${id}`),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.areas),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно брисање области.')
    }
})

export const editAreaMutation = (queryClient) => ({
    mutationFn: (data) =>
        axios.post(
            `http://localhost:3001/areas/edit/${data.id}`,
            data.formData
        ),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.areas),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање области.')
    }
})
