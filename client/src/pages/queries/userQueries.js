import axios from 'axios'

const queryKeys = {
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
  }
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