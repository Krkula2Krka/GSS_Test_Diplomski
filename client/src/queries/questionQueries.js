import axios from 'axios'
import toast from 'react-hot-toast'

const queryKeys = {
    questions: (id, page) => ['questions', id, page],
    count: (id) => ['count', id],
    size: ['size'],
    test: ['test']
}

export const getQuestionsBatchQuery = (id, page) => ({
    queryKey: queryKeys.questions(id, page),
    queryFn: async () => {
        const res = await fetch(`http://localhost:3001/questions/${id}/${page}`)
        return res.json()
    },
    staleTime: Infinity,
    cacheTime: Infinity
})

export const getQuestionsCountQuery = (id) => ({
    queryKey: queryKeys.count(id),
    queryFn: async () => {
        const res = await fetch(`http://localhost:3001/questions/count/${id}`)
        return res.json()
    },
    staleTime: Infinity,
    cacheTime: Infinity
})

export const getPageSizeQuery = () => ({
    queryKey: queryKeys.size,
    queryFn: async () => {
        const res = await fetch('http://localhost:3001/questions/pageSize')
        return res.json()
    },
    staleTime: Infinity,
    cacheTime: Infinity
})

export const setOperatorMutation = (queryClient, area_id) => ({
    mutationFn: (operator) =>
        axios.post('http://localhost:3001/questions/operator', operator),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['questions', area_id] })
        queryClient.invalidateQueries(queryKeys.count(area_id))
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setPageSizeMutation = (queryClient, area_id) => ({
    mutationFn: (pageSize) =>
        axios.post('http://localhost:3001/questions/setPageSize', pageSize),
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
        axios.post('http://localhost:3001/questions/setStartId', search),
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
        axios.post(
            'http://localhost:3001/questions/setDifficultyFilters',
            search
        ),
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
        axios.post(
            'http://localhost:3001/questions/setImportanceFilters',
            search
        ),
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
        axios.post('http://localhost:3001/questions/setSearchInput', search),
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
        axios.post('http://localhost:3001/questions/delete', data),
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
    mutationFn: (data) => axios.post('http://localhost:3001/questions', data),
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
        axios.post(
            `http://localhost:3001/questions/edit/${data.id}`,
            data.formData
        ),
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
    cacheTime: 0
})

export const testQuestionsLoader = (queryClient, condition) => async () => {
    const query = getTestQuestionsQuery(condition)
    return await queryClient.ensureQueryData({
        queryKey: query.queryKey,
        queryFn: query.queryFn
    })
}
