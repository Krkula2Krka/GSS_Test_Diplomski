import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

const client = axios.create({ baseURL: 'http://localhost:3001/' })

export const request = ({ ...options }, navigate) => {
    client.defaults.headers.common.Authorization = `Bearer ${Cookies.get(
        'accessToken'
    )}`
    const onSuccess = (response) => response
    const onError = (error) => {
        if (error.response.status === 401) {
            toast.remove()
            toast.error('Немате ауторизацију за ову акцију.')
            window.location.href = 'http://localhost:3000/unauthorized'
        } else if (error.response.status === 404) {
            toast.remove()
            toast.error('Грешка на серверу.')
        }
    }
    return client(options).then(onSuccess).catch(onError)
}
