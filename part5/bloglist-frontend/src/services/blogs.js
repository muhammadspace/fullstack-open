import axios from 'axios'
const baseUrl = 'https://probable-potato-p677x67prgrfvjw-3003.app.github.dev/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }