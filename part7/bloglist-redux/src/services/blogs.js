import axios from "axios"
const baseUrl = "http://localhost:3003/api/blogs"

let token = null

const setToken = newToken => token = `Bearer ${newToken}`

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async blog => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    console.log(config)

    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const update = async (id, content) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.put(`${baseUrl}/${id}`, content, config)
    return response.data
}

const del = async id => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const comment = async (blogid, comment) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const response = await axios.post(`${baseUrl}/${blogid}/comment`, { comment: comment }, config)
    return response.data
}

export default { getAll, create, setToken, update, del, comment }