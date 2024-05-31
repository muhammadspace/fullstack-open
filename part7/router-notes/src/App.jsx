import { useState } from "react"
import { Routes, Route, Link, useNavigate, useMatch, Navigate } from "react-router-dom"

const Notes = ({ notes }) => {
    return (
        <div>
            <h1>Notes</h1>
            <ul>
                { notes.map(n => <li key={n}><Link to={`/notes/${n}`}>{n}</Link></li>) }
            </ul>
        </div>
    )
}

const Note = ({ note }) => {
    console.log(note)
    return <p>{note}</p>
}

const Home = () => {
    return <h1>TKTL Notes App</h1>
}

const Users = () => {
    return <h1>Users</h1>
}

const Login = ({ onLogin }) => {
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
        onLogin(e.target.username.value)
        navigate("/")
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="username">username</label>
            <input id="username" name="usernmae" type="text" />
        </form>
    )
}

function App() {
    const [user, setUser] = useState(null)
    const match = useMatch("/notes/:id")

    const notes = [
        "Note1",
        "Note2",
        "Note3",
        "Note4",
        "Note5",
    ]

    const note = match ? notes.find(n => n === match.params.id) : null

    const onLogin = (credentials) => {
        setUser(credentials)
    }

    return (
        <>
            <div>
                <Link to="/" style={{padding: 5}}>home</Link>
                <Link to="/notes" style={{padding: 5}}>notes</Link>
                <Link to="/users" style={{padding: 5}}>users</Link>
                { user ? <i>{user} logged in</i> : <Link to="/login" style={{padding: 5}}>login</Link>}
            </div>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/notes" element={<Notes notes={notes}/>}/>
                <Route path="/users" element={user ? <Users/> : <Navigate replace to="/login"/>}/>
                <Route path="/login" element={<Login onLogin={onLogin}/>}/>
                <Route path="/notes/:id" element={<Note note={note}/>}/>
            </Routes>

            <footer>
                <i>Notes app, Department of Computer Science, 2024</i>
            </footer>
        </>
    )
}

export default App
