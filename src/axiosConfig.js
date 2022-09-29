import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000' // laravel
})
instance.defaults.withCredentials = true

const UserToken = JSON.parse(localStorage.getItem('UserToken'))
instance.defaults.headers.common['Authorization'] = `Bearer ${UserToken}`

export default instance