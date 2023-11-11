import toast from 'react-hot-toast'
import { request } from '../utils/axios'

const queryKeys = {
    answers: (id, page) => ['answers', id, page],
    count: (id) => ['answerCount', id],
    size: ['answerSize']
}

export const getAnswersBatchQuery = (id, page) => ({
    queryKey: queryKeys.answers(id, page),
    queryFn: () => request({ url: `/answers/${id}/${page}`, method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})

export const resetMutation = (queryClient) => ({
    mutationFn: () => request({ url: '/answers/reset', method: 'post' }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['answers'] })
        queryClient.invalidateQueries({ queryKey: ['answersCount'] })
        queryClient.invalidateQueries(queryKeys.size)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ресетовање параметра за претраживање.')
    }
})

export const getAnswersCountQuery = (id) => ({
    queryKey: queryKeys.count(id),
    queryFn: () => request({ url: `/answers/count/${id}`, method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})

export const getPageSizeQuery = () => ({
    queryKey: queryKeys.size,
    queryFn: () => request({ url: '/answers/pageSize', method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})

export const setOperatorMutation = (queryClient, question_id) => ({
    mutationFn: (operator) =>
        request({ url: '/answers/operator', method: 'post', data: operator }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['answers', question_id] })
        queryClient.invalidateQueries(queryKeys.count(question_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setPageSizeMutation = (queryClient, question_id) => ({
    mutationFn: (pageSize) =>
        request({
            url: '/answers/setPageSize',
            method: 'post',
            data: pageSize
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['answers', question_id] })
        queryClient.invalidateQueries(queryKeys.count(question_id))
        queryClient.invalidateQueries(queryKeys.size)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање величине странице.')
    }
})

export const setStartIdMutation = (queryClient, question_id) => ({
    mutationFn: (search) =>
        request({
            url: '/answers/setStartId',
            method: 'post',
            data: search
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['answers', question_id] })
        queryClient.invalidateQueries(queryKeys.count(question_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setCorrectnessFiltersMutation = (queryClient, question_id) => ({
    mutationFn: (search) =>
        request({
            url: '/answers/setCorrectnessFilters',
            method: 'post',
            data: search
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['answers', question_id] })
        queryClient.invalidateQueries(queryKeys.count(question_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setSearchInputMutation = (queryClient, question_id) => ({
    mutationFn: (search) =>
        request({
            url: '/answers/setSearchInput',
            method: 'post',
            data: search
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['answers', question_id] })
        queryClient.invalidateQueries(queryKeys.count(question_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const addAnswerMutation = (queryClient, question_id) => ({
    mutationFn: (data) =>
        request({
            url: '/answers',
            method: 'post',
            data: data
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['answers', question_id] })
        queryClient.invalidateQueries(queryKeys.count(question_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно додавање одговора.')
    }
})

export const deleteAnswersMutation = (queryClient, question_id, page) => ({
    mutationFn: (data) =>
        request({
            url: '/answers/delete',
            method: 'post',
            data: data
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey[0] === 'answers' &&
                query.queryKey[1] === question_id &&
                query.queryKey[2] >= page
        })
        queryClient.invalidateQueries(queryKeys.count(question_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно брисање одговора.')
    }
})

export const editAnswerMutation = (queryClient, id, page) => ({
    mutationFn: (data) =>
        request({
            url: `/answers/edit/${data.id}`,
            method: 'post',
            data: data.formData
        }),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.answers(id, page)),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање одговора.')
    }
})
