import axios from 'axios'
import toast from 'react-hot-toast'

export const addLoginMutation = () => ({
    mutationFn: (data) => axios.post('http://localhost:3001/logins', data)
})
