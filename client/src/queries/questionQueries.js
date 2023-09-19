import axios from 'axios'

const queryKeys = {
  questions: id => ['questions', id]
}

export const getQuestionsForAreaQuery = id => ({
  queryKey: queryKeys.questions(id),
  queryFn: async () => {
    const res = await fetch(`http://localhost:3001/questions/${id}`)
    const data = await res.json()
    return data
  },
  staleTime: 1000 * 60 * 30,
  cacheTime: 1000 * 60 * 30
})

export const questionsLoader =
  queryClient =>
  async ({ params }) => {
    const query = getQuestionsForAreaQuery(params.id)
    return await queryClient.ensureQueryData({
      queryKey: query.queryKey,
      queryFn: query.queryFn
    })
  }

export const deleteQuestionMutation = (queryClient, id) => ({
  mutationFn: id => axios.post(`http://localhost:3001/questions/delete/${id}`),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.questions(id)),
  onError: () => console.log('Unsuccessful deleteQuestion mutation!')
})

export const addQuestionMutation = (queryClient, id) => ({
  mutationFn: data => axios.post('http://localhost:3001/questions', data),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.questions(id)),
  onError: () => console.log('Unsuccessful addQuestion mutation!')
})

export const editQuestionMutation = (queryClient, id) => ({
  mutationFn: data =>
    axios.post(
      `http://localhost:3001/questions/edit/${data.id}`,
      data.formData
    ),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.questions(id)),
  onError: () => console.log('Unsuccessful editQuestion mutation!')
})
