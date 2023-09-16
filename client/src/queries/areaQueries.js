import axios from 'axios'

const queryKeys = {
  areas: ['areas'],
  areasPaginated: pageNumber => ['areas', pageNumber]
}

export const getAllAreasQuery = () => ({
  queryKey: queryKeys.areas,
  queryFn: async () => {
    const res = await fetch('http://localhost:3001/areas')
    const data = await res.json()
    return data
  },
  staleTime: 1000 * 60 * 30,
  cacheTime: 1000 * 60 * 30
})

export const getAllAreasPaginatedQuery = (pageNumber, condition) => ({
  queryKey: queryKeys.areasPaginated(pageNumber),
  queryFn: async () => {
    const res = await fetch(`http://localhost:3001/areas/page/${pageNumber}`)
    const data = await res.json()
    return data
  },
  enabled: condition,
  staleTime: 1000 * 60 * 30,
  cacheTime: 1000 * 60 * 30
})

export const areasLoader = queryClient => async () => {
  const query = getAllAreasQuery()
  return await queryClient.ensureQueryData({
    queryKey: query.queryKey,
    queryFn: query.queryFn
  })
}

export const areasPaginatedLoader =
  queryClient =>
  async ({ params }) => {
    const query = getAllAreasPaginatedQuery(params.pageNumber, true)
    return await queryClient.ensureQueryData({
      queryKey: query.queryKey,
      queryFn: query.queryFn
    })
  }

export const addAreaMutation = queryClient => ({
  mutationFn: data => axios.post('http://localhost:3001/areas', data),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.areas),
  onError: () => console.log('Unsuccessful addArea mutation!')
})

export const deleteAreaMutation = queryClient => ({
  mutationFn: id => axios.post(`http://localhost:3001/areas/delete/${id}`),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.areas),
  onError: () => console.log('Unsuccessful deleteArea mutation!')
})

export const editAreaMutation = queryClient => ({
  mutationFn: data => axios.post(`http://localhost:3001/areas/edit/${data.id}/${data.name}`),
  onSuccess: () => queryClient.invalidateQueries(queryKeys.areas),
  onError: () => console.log('Unsuccessful editArea mutation!')
})