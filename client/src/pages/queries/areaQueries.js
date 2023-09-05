const queryKeys = {
  areas: ['areas']
}

export const getAllAreasQuery = () => ({
  queryKey: queryKeys.areas,
  queryFn: async () => {
    const res = await fetch('http://localhost:3001/areas')
    const data = await res.json()
    return data
  }
})

export const areasLoader = queryClient => async () => {
  const query = getAllAreasQuery()
  return await queryClient.ensureQueryData({
    queryKey: query.queryKey,
    queryFn: query.queryFn
  })
}
