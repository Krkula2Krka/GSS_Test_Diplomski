import axios from 'axios'

const queryKeys = {
  questions: id => ['questions', id],
  test: ['test']
}

export const getQuestionsBatchQuery = id => ({
  queryKey: queryKeys.questions(id),
  queryFn: async ({ pageParam = 0 }) => {
    const res = await fetch(`http://localhost:3001/questions/${id}/${pageParam}`)
    const data = await res.json()
    return data
  },
  staleTime: 1000 * 60 * 30,    
  cacheTime: 1000 * 60 * 30,
  getNextPageParam: (lastPage, pages) =>
    lastPage.length === 30 ? pages.length : undefined
})

export const deleteQuestionMutation = (queryClient, id) => ({
  mutationFn: id => axios.post(`http://localhost:3001/questions/delete/${id}`),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.questions(id))
})

export const addQuestionMutation = (queryClient, id) => ({
  mutationFn: data => axios.post('http://localhost:3001/questions', data),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.questions(id))
})

export const editQuestionMutation = (queryClient, id) => ({
  mutationFn: data =>
    axios.post(
      `http://localhost:3001/questions/edit/${data.id}`,
      data.formData
    ),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.questions(id))
})

export const getTestQuestionsQuery = condition => ({
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

export const deleteQuestionsMutation = (queryClient, id) => ({
  mutationFn: data =>
    axios.post('http://localhost:3001/questions/delete/', data),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.questions(id))
})
