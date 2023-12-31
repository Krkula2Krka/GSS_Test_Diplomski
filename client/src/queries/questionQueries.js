import toast from 'react-hot-toast'
import { request } from '../utils/axios'

const queryKeys = {
    questions: (id, page) => ['questions', id, page],
    count: (id) => ['questionsCount', id],
    size: ['questionsSize'],
    test: ['questionsTest']
}

export const getQuestionsBatchQuery = (id, page) => ({
    queryKey: queryKeys.questions(id, page),
    queryFn: () => request({ url: `/questions/${id}/${page}`, method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})

export const getQuestionsCountQuery = (id) => ({
    queryKey: queryKeys.count(id),
    queryFn: () => request({ url: `/questions/count/${id}`, method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})

export const getPageSizeQuery = () => ({
    queryKey: queryKeys.size,
    queryFn: () => request({ url: '/questions/pageSize', method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})

export const setOperatorMutation = (queryClient, area_id) => ({
    mutationFn: (operator) =>
        request({ url: '/questions/operator', method: 'post', data: operator }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['questions', area_id] })
        queryClient.invalidateQueries(queryKeys.count(area_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const resetMutation = (queryClient) => ({
    mutationFn: () => request({ url: '/questions/reset', method: 'post' }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['questions'] })
        queryClient.invalidateQueries({ queryKey: ['questionsCount'] })
        queryClient.invalidateQueries(queryKeys.size)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ресетовање параметра за претраживање.')
    }
})

export const setPageSizeMutation = (queryClient, area_id) => ({
    mutationFn: (pageSize) =>
        request({
            url: '/questions/setPageSize',
            method: 'post',
            data: pageSize
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['questions', area_id] })
        queryClient.invalidateQueries(queryKeys.count(area_id))
        queryClient.invalidateQueries(queryKeys.size)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање величине странице.')
    }
})

export const setStartIdMutation = (queryClient, area_id) => ({
    mutationFn: (search) =>
        request({
            url: '/questions/setStartId',
            method: 'post',
            data: search
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['questions', area_id] })
        queryClient.invalidateQueries(queryKeys.count(area_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setDifficultyFiltersMutation = (queryClient, area_id) => ({
    mutationFn: (search) =>
        request({
            url: '/questions/setDifficultyFilters',
            method: 'post',
            data: search
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['questions', area_id] })
        queryClient.invalidateQueries(queryKeys.count(area_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setImportanceFiltersMutation = (queryClient, area_id) => ({
    mutationFn: (search) =>
        request({
            url: '/questions/setImportanceFilters',
            method: 'post',
            data: search
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['questions', area_id] })
        queryClient.invalidateQueries(queryKeys.count(area_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setSearchInputMutation = (queryClient, area_id) => ({
    mutationFn: (search) =>
        request({
            url: '/questions/setSearchInput',
            method: 'post',
            data: search
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['questions', area_id] })
        queryClient.invalidateQueries(queryKeys.count(area_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const deleteQuestionsMutation = (queryClient, area_id, page) => ({
    mutationFn: (data) =>
        request({
            url: '/questions/delete',
            method: 'post',
            data: data
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey[0] === 'questions' &&
                query.queryKey[1] === area_id &&
                query.queryKey[2] >= page
        })
        queryClient.invalidateQueries(queryKeys.count(area_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно брисање питања.')
    }
})

export const addQuestionMutation = (queryClient, area_id) => ({
    mutationFn: (data) =>
        request({
            url: '/questions',
            method: 'post',
            data: data
        }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['questions', area_id] })
        queryClient.invalidateQueries(queryKeys.count(area_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно додавање питања.')
    }
})

export const editQuestionMutation = (queryClient, area_id, page) => ({
    mutationFn: (data) =>
        request({
            url: `/questions/edit/${data.id}`,
            method: 'post',
            data: data.formData
        }),
    onSuccess: () =>
        queryClient.invalidateQueries(queryKeys.questions(area_id, page)),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање питања.')
    }
})

export const getTestQuestionsQuery = (condition) => ({
    queryKey: queryKeys.test,
    queryFn: async () => {
        const res = await fetch('http://localhost:3001/questions/test')
        const data = await res.json()
        return data
    },
    enabled: condition,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30
})
