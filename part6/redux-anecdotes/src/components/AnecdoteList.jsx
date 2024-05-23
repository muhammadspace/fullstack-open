import { useSelector, useDispatch } from "react-redux"
import { voteAC } from "../reducers/anecdoteReducer.js"
import { setNotificationMessageAC, clearNotificationAC } from "../reducers/notificationReducer.js"

const Anecdote = ({ anecdote, vote}) => {
    return (
        <>
            <div>
                {anecdote.content}
            </div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
        </>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.filter 
            ? state.anecdotes.filter( anecdote => anecdote.content.search(state.filter) !== -1 )
            : state.anecdotes
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAC(anecdote.id))

        dispatch(clearNotificationAC())
        const timeoutId = setTimeout(() => {
            dispatch(clearNotificationAC())
        }, 5 * 1000);
        dispatch(setNotificationMessageAC({ 
            message: `Voted anecdote "${anecdote.content}"`,
            timeoutId}))

    }

    return (
        <>
            {anecdotes?.toSorted( (a, b) => b.votes - a.votes ).map(anecdote =>
                <Anecdote anecdote={anecdote} vote={vote} key={anecdote.id}/>
            )}
        </>
    )
}

export default AnecdoteList