import { useState } from "react"
import { Routes, Route, Link, useNavigate, useMatch, Navigate } from "react-router-dom"
import { Toolbar, Alert, Container, Table, TableContainer, TableRow, TableCell, Paper, Button, TextField, AppBar } from "@mui/material"

const Notes = ({ notes }) => {
    return (
        <div>
            <h1>Notes</h1>
            <TableContainer component={Paper}>
                <Table>
                    { notes.map(n => 
                    <TableRow key={n}>
                        <TableCell>
                            <Link to={`/notes/${n}`}>{n}</Link>
                        </TableCell>
                        <TableCell>
                            User
                        </TableCell>
                    </TableRow>
                    ) }
                </Table>
            </TableContainer>
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
            <div>
                <TextField label="username" id="username" name="username" />
            </div>
            <div>
                <TextField label="password" type="password" />
            </div>
            <div>
                <Button type="submit" variant="contained" color="primary">login</Button>
            </div>
        </form>
    )
}

function App() {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState("")
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
        setMessage(`welcome ${credentials}`)
        setTimeout(() => setMessage(""), 5000)
    }

    return (
        <Container>
            { message && <Alert severity="success">{message}</Alert>}
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">home</Button>
                    <Button color="inherit" component={Link} to="/notes">notes</Button>
                    <Button color="inherit" component={Link} to="/users">users</Button>
                    { user ? <i>{user} logged in</i> : <Button color="inherit" component={Link} to="/login">login</Button>}
                </Toolbar>
            </AppBar>

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
        </Container>
    )
}

export default App
