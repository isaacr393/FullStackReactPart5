import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const login = async credentials => {
  let response = await axios.post('/api/login', credentials)
  return response.data
}

const setToken = token => {
  token = `Bearer ${token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const exports = { getAll, login, setToken }

export default exports