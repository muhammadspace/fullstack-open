import axios from "axios"

const baseurl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseurl)
    return response.data
}

const createAnecdote = async (anecdote) => {
    const response = await axios.post(baseurl, anecdote)
    return response.data
}

const vote = async (anecdote) => {
    const response = await axios.put(`${baseurl}/${anecdote.id}`, {
        ...anecdote,
        votes: anecdote.votes + 1
    })
    return response.data
}

export default {
    getAll,
    createAnecdote,
    vote
}