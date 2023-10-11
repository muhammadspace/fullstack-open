import axios from 'axios'
const baseUrl = 'https://probable-potato-p677x67prgrfvjw-3003.app.github.dev/api/blogs'

let token = null

const setToken = newToken => token = `Bearer ${newToken}`

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async content => {
    const config = {
            headers: {
                Authorization: token
        }
    }

    console.log(config)
  
    const response = await axios.post(baseUrl, content, config)
    return response.data
}

export default { getAll, create, setToken }