import axios from 'axios'

const queryKeys = {
  answers: id => ['answers', id]
}

export const getAnswersBatchQuery = id => ({
  queryKey: queryKeys.answers(id),
  queryFn: async ({ pageParam = 0 }) => {
    const res = await fetch(`http://localhost:3001/answers/${id}/${pageParam}`)
    const data = await res.json()
    return data
  },
  staleTime: 1000 * 60 * 30,
  cacheTime: 1000 * 60 * 30,
  getNextPageParam: (lastPage, pages) =>
    lastPage.length === 30 ? pages.length : undefined
})

export const addAnswerMutation = (queryClient, id) => ({
  mutationFn: data => axios.post('http://localhost:3001/answers', data),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.answers(id))
})

export const deleteAnswersMutation = (queryClient, id) => ({
  mutationFn: data => axios.post('http://localhost:3001/answers/delete', data),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.answers(id))
})

export const editAnswerMutation = (queryClient, id) => ({
  mutationFn: data =>
    axios.post(`http://localhost:3001/answers/edit/${data.id}`, data.formData),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.answers(id))
})
