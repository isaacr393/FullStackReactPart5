import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const login = async credentials => {
  let response = await axios.post('/api/login', credentials)
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },  
  }
  let response = await axios.post('/api/blogs', blog, config)
  return response.data
}

const update = async (id, blog) => {
  const config = {
    headers: { Authorization: token },  
  }
  let response = await axios.put(`/api/blogs/${id}`, blog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },  
  }
  let response = await axios.delete(`/api/blogs/${id}`, config)
  return response.data
}

const exports = { getAll, login, setToken, create, update, remove }

export default exports