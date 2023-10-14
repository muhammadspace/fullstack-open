import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

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