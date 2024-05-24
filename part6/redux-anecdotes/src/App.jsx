import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { initializeAnecdotesAC } from './reducers/anecdoteReducer.js'

import Filter from './components/Filter.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'
import AnecdoteForm from './components/AnecdoteForm.jsx'
import Notification from "./components/Notification.jsx"

const App = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(initializeAnecdotesAC())
        }, [])

    return (
        <>
            <Notification/>
            <h2>Anecdotes</h2>
            <Filter/>
            <AnecdoteList/>
            <AnecdoteForm/>
        </>
    )
}

export default App