import axios from 'axios'

const queryKeys = {
    users: ['users'],
    loggedIn: id => ['loggedIn', id]
}

export const checkLoginForTestingQuery = id => ({
  queryKey: queryKeys.loggedIn(id),
  queryFn: async () => {
    const res = await fetch(
      `http://localhost:3001/auth/checkLoginForTesting/${id}`
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
  mutationFn: () => axios.post(`http://localhost:3001/auth/logoutForTesting/${id}`),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.loggedIn(id)),
  onError: () => console.log('error in logoutForTesting mutation')
})

export const getAllNonadminUsersQuery = () => ({
  queryKey: queryKeys.users,
  queryFn: async () => {
    const res = await fetch('http://localhost:3001/auth')
    const data = await res.json()
    return data
  },
  staleTime: 1000 * 60 * 30,
  cacheTime: 1000 * 60 * 30
})

export const usersLoader = queryClient => async () => {
  const query = getAllNonadminUsersQuery()
  return await queryClient.ensureQueryData({
    queryKey: query.queryKey,
    queryFn: query.queryFn
  })
}