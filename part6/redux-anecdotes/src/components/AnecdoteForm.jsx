import { useDispatch } from "react-redux"
import { createAnecdoteAC } from "../reducers/anecdoteReducer.js"
import { setNotificationAC } from "../reducers/notificationReducer.js"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()

        const content = e.target.anecdote.value
        e.target.anecdote.value = ""

        dispatch(createAnecdoteAC(content))
        dispatch(setNotificationAC(`Added new anecdote: "${content}"`, 5))
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