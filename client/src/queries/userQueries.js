import axios from 'axios'
import toast from 'react-hot-toast'
import { request } from '../utils/axios'

const queryKeys = {
    users: (page) => ['users', page],
    count: ['usersCount'],
    size: ['usersSize'],
    loggedIn: (id) => ['usersLoggedIn', id]
}

export const checkLoginForTestingQuery = (id) => ({
    queryKey: queryKeys.loggedIn(id),
    queryFn: async () => {
        const res = await fetch(
            `http://localhost:3001/users/checkLoginForTesting/${id}`
        )
        const data = await res.json()
        return data.loggedIn
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30
})

export const loggedInLoader =
    (queryClient) =>
    async ({ params }) => {
        const query = checkLoginForTestingQuery(params.id)
        return await queryClient.ensureQueryData({
            queryKey: query.queryKey,
            queryFn: query.queryFn
        })
    }

export const logoutForTestingMutation = (id, queryClient) => ({
    mutationFn: () =>
        axios.post(`http://localhost:3001/users/logoutForTesting/${id}`),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.loggedIn(id)),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно одјављивање корисника.')
    }
})

export const loginForTestingMutation = () => ({
    mutationFn: (data) =>
        axios.post('http://localhost:3001/users/loginForTesting', data),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно пријављивање корисника.')
    }
})

export const createUserMutation = (queryClient) => ({
    mutationFn: (data) =>
        request({ url: '/users', method: 'post', data: data }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        queryClient.invalidateQueries(queryKeys.count)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно додавање корисника.')
    }
})

export const editUserMutation = (queryClient, page) => ({
    mutationFn: (data) =>
        request({ url: '/users/edit', method: 'post', data: data }),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.users(page)),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање корисника.')
    }
})

export const deleteUsersMutation = (queryClient, page) => ({
    mutationFn: (data) =>
        request({ url: '/users/delete', method: 'post', data: data }),
    onSuccess: () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey[0] === 'users' && query.queryKey[1] >= page
        })
        queryClient.invalidateQueries(queryKeys.count)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно брисање корисника.')
    }
})

export const setSearchInputMutation = (queryClient) => ({
    mutationFn: (search) =>
        request({ url: '/users/setSearchInput', method: 'post', data: search }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        queryClient.invalidateQueries(queryKeys.count)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const resetMutation = (queryClient) => ({
    mutationFn: () => request({ url: '/users/reset', method: 'post' }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        queryClient.invalidateQueries(queryKeys.count)
        queryClient.invalidateQueries(queryKeys.size)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ресетовање параметра за претраживање.')
    }
})

export const setStartIdMutation = (queryClient) => ({
    mutationFn: (search) =>
        request({ url: '/users/setStartId', method: 'post', data: search }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        queryClient.invalidateQueries(queryKeys.count)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const setPageSizeMutation = (queryClient) => ({
    mutationFn: (pageSize) =>
        request({ url: '/users/setPageSize', method: 'post', data: pageSize }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        queryClient.invalidateQueries(queryKeys.count)
        queryClient.invalidateQueries(queryKeys.size)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање величине странице.')
    }
})

export const setOperatorMutation = (queryClient) => ({
    mutationFn: (operator) =>
        request({ url: '/users/operator', method: 'post', data: operator }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        queryClient.invalidateQueries(queryKeys.count)
    },
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање параметра за претраживање.')
    }
})

export const getPageSizeQuery = () => ({
    queryKey: queryKeys.size,
    queryFn: () => request({ url: '/users/pageSize', method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})

export const getUsersCountQuery = () => ({
    queryKey: queryKeys.count,
    queryFn: () => request({ url: '/users/count', method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})

export const getUsersBatchQuery = (page) => ({
    queryKey: queryKeys.users(page),
    queryFn: () => request({ url: `/users/${page}`, method: 'get' }),
    staleTime: Infinity,
    cacheTime: Infinity
})
