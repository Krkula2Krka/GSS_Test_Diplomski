import toast from 'react-hot-toast'
import axios from 'axios'
import { request } from '../utils/axios'

const queryKeys = {
    results: (id, page) => ['results', id, page],
    count: (id) => ['resultCount', id],
    test: (id) => ['resultSize', id],
    size: ['resultSize']
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

export const deleteResultsMutation = (user_id, queryClient, page) => ({
    mutationFn: (data) =>
        request({ url: '/results/delete', method: 'post', data: data }),
    onSuccess: () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey[0] === 'results' &&
                query.queryKey[1] === user_id &&
                query.queryKey[2] >= page
        })
        queryClient.invalidateQueries(queryKeys.count)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно брисање резултата.')
    }
})

export const setPageSizeMutation = (queryClient, user_id) => ({
    mutationFn: (pageSize) =>
        request({
            url: '/results/setPageSize',
            method: 'post',
            data: pageSize
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['results', user_id] })
        queryClient.invalidateQueries(queryKeys.count(user_id))
        queryClient.invalidateQueries(queryKeys.size)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање величине странице.')
    }
})

export const getPageSizeQuery = () => ({
    queryKey: queryKeys.size,
    queryFn: () => request({ url: '/results/pageSize', method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})

export const resetMutation = (queryClient) => ({
    mutationFn: () => request({ url: '/results/reset', method: 'post' }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['results'] })
        queryClient.invalidateQueries({ queryKey: ['resultsCount'] })
        queryClient.invalidateQueries(queryKeys.size)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ресетовање параметра за претраживање.')
    }
})

export const getTestResultQuery = (id) => ({
    queryKey: queryKeys.test(id),
    queryFn: () => request({ url: `/results/testResult/${id}`, method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})

export const setStartIdMutation = (queryClient, user_id) => ({
    mutationFn: (search) =>
        request({
            url: '/results/setStartId',
            method: 'post',
            data: search
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['results', user_id] })
        queryClient.invalidateQueries(queryKeys.count(user_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setOperatorIdMutation = (queryClient, user_id) => ({
    mutationFn: (operator) =>
        request({ url: '/results/operator', method: 'post', data: operator }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['results', user_id] })
        queryClient.invalidateQueries(queryKeys.count(user_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setAquiredPointsMutation = (queryClient, user_id) => ({
    mutationFn: (search) =>
        request({
            url: '/results/setAquiredPoints',
            method: 'post',
            data: search
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['results', user_id] })
        queryClient.invalidateQueries(queryKeys.count(user_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setOperatorPointsMutation = (queryClient, user_id) => ({
    mutationFn: (operator) =>
        request({
            url: '/results/operatorPoints',
            method: 'post',
            data: operator
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['results', user_id] })
        queryClient.invalidateQueries(queryKeys.count(user_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setTestPassedMutation = (queryClient, user_id) => ({
    mutationFn: (search) =>
        request({
            url: '/results/setTestPassed',
            method: 'post',
            data: search
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['results', user_id] })
        queryClient.invalidateQueries(queryKeys.count(user_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setDateMutation = (queryClient, user_id) => ({
    mutationFn: (search) =>
        request({
            url: '/results/setDate',
            method: 'post',
            data: search
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['results', user_id] })
        queryClient.invalidateQueries(queryKeys.count(user_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setOperatorDateMutation = (queryClient, user_id) => ({
    mutationFn: (operator) =>
        request({
            url: '/results/operatorDate',
            method: 'post',
            data: operator
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['results', user_id] })
        queryClient.invalidateQueries(queryKeys.count(user_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})
