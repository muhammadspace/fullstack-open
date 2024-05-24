import axios from "axios"

const baseurl = "http://localhost:3001/notes"

const getAll = async () => {
    const response = await axios.get(baseurl)
    return response.data
}

const createNote = async (content) => {
    const response = await axios.post(baseurl, { content, important: false })
    return response.data
}

export default {
    getAll,
    createNote
}