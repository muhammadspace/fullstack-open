import axios from "axios"

const baseurl = "http://localhost:3001/notes"

export const getNotes = async () => {
    const response = await axios.get(baseurl)
    return response.data
}

export const createNote = async (note) => {
    const response = await axios.post(baseurl, note)
    return response.data
}

export const toggleImportance = async (note) => {
    const response = await axios.put(`${baseurl}/${note.id}`, note)
    return response.data
}