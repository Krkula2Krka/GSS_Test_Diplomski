import axios from 'axios'
import toast from 'react-hot-toast'

const queryKeys = {
    users: ['users'],
    nextBatch: ['nextBatch'],
    loggedIn: (id) => ['loggedIn', id]
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

export const getUsersBatchQuery = () => ({
    queryKey: queryKeys.users,
    queryFn: async ({ pageParam = 0 }) => {
        const res = await fetch(`http://localhost:3001/users/${pageParam}`)
        return res.json()
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30,
    getNextPageParam: (lastPage, pages) =>
        lastPage.length === 30 ? pages.length : undefined
})

export const loginForTestingMutation = () => ({
    mutationFn: (data) =>
        axios.post('http://localhost:3001/users/loginForTesting/', data),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно пријављивање корисника.')
    }
})

export const createUserMutation = (queryClient) => ({
    mutationFn: (data) => axios.post('http://localhost:3001/users/', data),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.users),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно додавање корисника.')
    }
})

export const editUserMutation = (queryClient) => ({
    mutationFn: (data) =>
        axios.post(
            `http://localhost:3001/users/edit/${data.GSS_identification}`,
            data.formData
        ),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.users),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно ажурирање корисника.')
    }
})

export const deleteUsersMutation = (queryClient) => ({
    mutationFn: (data) =>
        axios.post('http://localhost:3001/users/delete/', data),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.users),
    onError: () => {
        toast.remove()
        toast.error('Неуспешно брисање корисника.')
    }
})

export const searchUsersMutation = (queryClient) => ({
    mutationFn: (data) =>
        axios.post('http://localhost:3001/users/search/', data),
    onSuccess: () => queryClient.invalidateQueries(queryKeys.users),
    onError: () => {
        toast.remove()
        toast.error('Неуспешна претрага корисника.')
    }
})
