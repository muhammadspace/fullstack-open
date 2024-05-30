import axios from "axios"

const baseurl = "http://localhost:3001/anecdotes"

export const getAll = async () => {
    return (await axios.get(baseurl)).data
}

export const createAnecdote = async (anecdote) => {
    return (await axios.post(baseurl, anecdote)).data
}

export const voteAnecdote = async (anecdote) => {
    return (await axios.put(`${baseurl}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 })).data
}