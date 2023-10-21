import axios from 'axios'

const queryKeys = {
  users: ['users'],
  nextBatch: ['nextBatch'],
  loggedIn: id => ['loggedIn', id]
}

export const checkLoginForTestingQuery = id => ({
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
  queryClient =>
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
  onSuccess: () => queryClient.invalidateQueries(queryKeys.loggedIn(id))
})

export const getUsersBatchQuery = ({ pageParam }) => ({
  queryKey: queryKeys.users,
  queryFn: async () => {
    const res = await fetch(`http://localhost:3001/users/page=${pageParam}`)
    const data = await res.json()
    return data
  },
  staleTime: 1000 * 60 * 30,
  cacheTime: 1000 * 60 * 30
})

export const usersLoader = queryClient => async () => {
  const query = getUsersBatchQuery(0)
  return await queryClient.ensureQueryData({
    queryKey: query.queryKey,
    queryFn: query.queryFn
  })
}

export const loginForTestingMutation = () => ({
  mutationFn: data =>
    axios.post('http://localhost:3001/users/loginForTesting/', data)
})

export const createUserMutation = queryClient => ({
  mutationFn: data => axios.post('http://localhost:3001/users/', data),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.users)
})

export const editUserMutation = queryClient => ({
  mutationFn: data =>
    axios.post(
      `http://localhost:3001/users/edit/${data.GSS_identification}`,
      data.formData
    ),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.users)
})

export const deleteUsersMutation = queryClient => ({
  mutationFn: data => axios.post('http://localhost:3001/users/delete/', data),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.users)
})
