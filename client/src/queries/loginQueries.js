import axios from 'axios'

export const addLoginMutation = () => ({
    mutationFn: (data) => axios.post('http://localhost:3001/logins', data)
})
