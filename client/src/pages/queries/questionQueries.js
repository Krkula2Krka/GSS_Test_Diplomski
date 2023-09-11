const queryKeys = {
  questions: id => ['questions', id]
}

export const getQuestionsForAreaQuery = id => ({
  queryKey: queryKeys.questions(id),
  queryFn: async () => {
    const res = await fetch(`http://localhost:3001/questions/${id}`)
    const data = await res.json()
    return data
  }
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