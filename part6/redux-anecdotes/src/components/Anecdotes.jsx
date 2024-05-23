import { useSelector, useDispatch } from "react-redux"
import { voteAC } from "../reducers/anecdoteReducer.js"

const Anecdote = ({ anecdote, vote}) => {
    return (
        <>
            <div>
                {anecdote.content}
            </div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
        </>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.concat())
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAC(id))
    }

    return (
        <>
            {anecdotes?.sort( (a, b) => b.votes - a.votes ).map(anecdote =>
                <Anecdote anecdote={anecdote} vote={vote} key={anecdote.id}/>
            )}
        </>
    )
}

export default AnecdoteList