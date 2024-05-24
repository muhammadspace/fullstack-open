import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes.service.js"

const asObject = (content) => {
  return {
    content,
    votes: 0
  }
}

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        appendAnecdoteAC(state, action)
        {
            return state.concat(action.payload)
        },
        updateVoteAC(state, action)
        {
            const updatedAnecdote = action.payload
            const anecdoteToChange = state.find( anc => anc.id === updatedAnecdote.id )
            anecdoteToChange.votes = updatedAnecdote.votes;
        },
        setAnecdotesAC(state, action)
        {
            return action.payload
        }
    }
})

export const { appendAnecdoteAC, setAnecdotesAC } = anecdoteSlice.actions

export const initializeAnecdotesAC = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotesAC(anecdotes))
    }
}

export const createAnecdoteAC = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createAnecdote(asObject(content))
        dispatch(appendAnecdoteAC(newAnecdote))
    }
}

export const voteAC = (anecdote) => {
    return async dispatch => {
        const updatedAnecdotea = await anecdoteService.vote(anecdote)
        dispatch(anecdoteSlice.actions.updateVoteAC(updatedAnecdotea))
    }
}

export default anecdoteSlice.reducer