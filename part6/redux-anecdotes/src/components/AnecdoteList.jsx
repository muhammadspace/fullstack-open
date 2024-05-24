import { useSelector, useDispatch } from "react-redux"
import { voteAC } from "../reducers/anecdoteReducer.js"
import { setNotificationAC } from "../reducers/notificationReducer.js"

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
        dispatch(voteAC(anecdote))
        dispatch(setNotificationAC(`Voted anecdote "${anecdote.content}"`, 1))
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