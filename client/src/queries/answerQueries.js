import axios from 'axios'

const queryKeys = {
  answers: id => ['answers', id]
}

export const getAnswersForQuestionQuery = id => ({
  queryKey: queryKeys.answers(id),
  queryFn: async () => {
    const res = await fetch(`http://localhost:3001/answers/${id}`)
    const data = await res.json()
    return data
  },
  staleTime: 1000 * 60 * 30,
  cacheTime: 1000 * 60 * 30
})

export const answersLoader =
  queryClient =>
  async ({ params }) => {
    const query = getAnswersForQuestionQuery(params.id)
    return await queryClient.ensureQueryData({
      queryKey: query.queryKey,
      queryFn: query.queryFn
    })
  }

export const addAnswerMutation = (queryClient, id) => ({
  mutationFn: data => axios.post('http://localhost:3001/answers', data),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.answers(id))
})

export const deleteAnswerMutation = (queryClient, id) => ({
  mutationFn: id => axios.post(`http://localhost:3001/answers/delete/${id}`),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.answers(id))
})

export const editAnswerMutation = (queryClient, id) => ({
  mutationFn: data =>
    axios.post(
      `http://localhost:3001/answers/edit/${data.id}`,
      data.formData
    ),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.answers(id))
})
