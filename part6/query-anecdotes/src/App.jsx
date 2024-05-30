import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from 'react'
import { getAll, createAnecdote, voteAnecdote } from './requests'
import NotificationContext from './NotificationContext'

const App = () => {
    const [notification, notificationDispatch] = useContext(NotificationContext)

    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ["anecdotes"],
        queryFn: getAll,
        refetchOnWindowFocus: false,
        retry: 1
    })

    const newAnecdoteMutation = useMutation({ 
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(["anecdotes"])
            queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
            notificationDispatch({
                type: "POST",
                payload: {
                    message: `Created new anecdote "${newAnecdote.content}"`
                }
            })
        },
        onError: (err) => {
            notificationDispatch({
                type: "POST",
                payload: {
                    message: "Anecdote content is too short. Must be 5 characters or more."
                }
            })
        }
    })

    const voteMutation = useMutation({
        mutationFn: voteAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(["anecdotes"])
            queryClient.setQueryData(["anecdotes"], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
            notificationDispatch({
                type: "POST",
                payload: {
                    message: `Voted anecdote "${updatedAnecdote.content}"`
                }
            })
        }
    })

    const handleVote = (anecdote) => {
        voteMutation.mutate(anecdote)
    }

    const anecdotes = query.data

    if (query.isLoading)
        return <h1>loading...</h1>

    if (query.isError)
    {
        return <h1>anecdote service is not available at the moment.</h1>
    }

    return (
        <div>
            <h3>Anecdote app</h3>
            
            <Notification />
            <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />
            
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
        )}
        </div>
    )
}

export default App
