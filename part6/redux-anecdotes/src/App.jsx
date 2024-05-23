import AnecdoteForm from './components/AnecdoteForm.jsx'
import AnecdoteList from './components/Anecdotes.jsx'

const App = () => {
    return (
        <>
            <h2>Anecdotes</h2>
            <AnecdoteList/>
            <AnecdoteForm/>
        </>
    )
}

export default App