import axios from 'axios'
import toast from 'react-hot-toast'

const queryKeys = {
    answers: (id, page) => ['answers', id, page],
    count: (id) => ['answerCount', id],
    size: ['answerSize']
}

export const getAnswersBatchQuery = (id, page) => ({
    queryKey: queryKeys.answers(id),
    queryFn: async () => {
        const res = await fetch(`http://localhost:3001/answers/${id}/${page}`)
        return res.json()
    },
    staleTime: Infinity,
    cacheTime: Infinity
})

export const getAnswersCountQuery = (id) => ({
    queryKey: queryKeys.count(id),
    queryFn: async () => {
        const res = await fetch(`http://localhost:3001/answers/count/${id}`)
        return res.json()
    },
    staleTime: Infinity,
    cacheTime: Infinity
})

export const getPageSizeQuery = () => ({
    queryKey: queryKeys.size,
    queryFn: async () => {
        const res = await fetch('http://localhost:3001/answers/pageSize')
        return res.json()
    },
    staleTime: Infinity,
    cacheTime: Infinity
})

export const setOperatorMutation = (queryClient, question_id) => ({
    mutationFn: (operator) =>
        axios.post('http://localhost:3001/answers/operator', operator),
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
        axios.post('http://localhost:3001/answers/setPageSize', pageSize),
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
        axios.post('http://localhost:3001/answers/setStartId', search),
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
        axios.post(
            'http://localhost:3001/answers/setCorrectnessFilters',
            search
        ),
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
        axios.post('http://localhost:3001/answers/setSearchInput', search),
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
    mutationFn: (data) => axios.post('http://localhost:3001/answers', data),
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
        axios.post('http://localhost:3001/answers/delete', data),
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
        axios.post(
            `http://localhost:3001/answers/edit/${data.id}`,
            data.formData
        ),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.answers(id, page)),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање одговора.')
    }
})
