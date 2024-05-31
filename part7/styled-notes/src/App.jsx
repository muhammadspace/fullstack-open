import { useState } from "react"
import { Routes, Route, Link, useNavigate, useMatch, Navigate } from "react-router-dom"
import styled from "styled-components"

const Button = styled.button`
    background: slateblue;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid blue;
    border-radius: 3px;
    color: white;
    cursor: pointer;
`

const Input = styled.input`
    margin: 0.25em;
    display: block;
    padding: 0.5em;
    border: 2px solid lightgray;
`

const Page = styled.div`
    padding: 1em;
    background: papayawhip;
`

const Footer = styled.div`
    padding: 1em;
    background: chocolate;
`

const Navigation = styled.div`
    padding: 1em;
    background: burlywood;
`

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
        onLogin(e.target.username.value)
        navigate("/")
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="username">username</label>
            <Input id="username" name="usernmae" type="text" />
            <label htmlFor="password">password</label>
            <Input id="password" name="password" type="password" />
            <Button type="submit">login</Button>
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
        <Page>
            <Navigation>
                <Link to="/" style={{padding: 5}}>home</Link>
                <Link to="/notes" style={{padding: 5}}>notes</Link>
                <Link to="/users" style={{padding: 5}}>users</Link>
                { user ? <i>{user} logged in</i> : <Link to="/login" style={{padding: 5}}>login</Link>}
            </Navigation>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/notes" element={<Notes notes={notes}/>}/>
                <Route path="/users" element={user ? <Users/> : <Navigate replace to="/login"/>}/>
                <Route path="/login" element={<Login onLogin={onLogin}/>}/>
                <Route path="/notes/:id" element={<Note note={note}/>}/>
            </Routes>

            <Footer>
                <i>Notes app, Department of Computer Science, 2024</i>
            </Footer>
        </Page>
    )
}

export default App
