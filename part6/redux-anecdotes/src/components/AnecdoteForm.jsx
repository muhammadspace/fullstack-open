import { useDispatch } from "react-redux"
import { createAnecdoteAC } from "../reducers/anecdoteReducer.js"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (e) => {
        e.preventDefault()

    const content = e.target.anecdote.value
    dispatch(createAnecdoteAC(content))

    e.target.anecdote.value = ""
  }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm