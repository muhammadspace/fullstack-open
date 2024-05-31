import { useState } from "react"
import { Routes, Route, Link, useNavigate, useMatch, Navigate } from "react-router-dom"
import { Table, Form, Button, Alert, Navbar, Nav } from "react-bootstrap"

const Notes = ({ notes }) => {
    return (
        <div>
            <h1>Notes</h1>
            <Table striped>
                <tbody>
                { notes.map(n => 
                    <tr key={n}>
                        <td>
                            <Link to={`/notes/${n}`}>{n}</Link>
                        </td>
                        <td>
                            User
                        </td>
                    </tr>) }
                </tbody>
            </Table>
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
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label htmlFor="username">username</Form.Label>
                <Form.Control id="username" name="usernmae" type="text" />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="password">password</Form.Label>
                <Form.Control id="password" name="password" type="password" />
            </Form.Group>
            <Form.Group>
                <Button type="submit" variant="primary">login</Button>
            </Form.Group>
        </Form>
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
        <div className="container">
            {
                message && <Alert variant="success">{message}</Alert>
            }
            <Navbar collapseOnSelect expand="lg">
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="" as="span">
                            <Link to="/" style={{padding: 5}}>home</Link>
                        </Nav.Link>
                        <Nav.Link href="" as="span">
                            <Link to="/notes" style={{padding: 5}}>notes</Link>
                        </Nav.Link>
                        <Nav.Link href="" as="span">
                            <Link to="/users" style={{padding: 5}}>users</Link>
                        </Nav.Link>
                        <Nav.Link href="" as="span">
                            { user ? <i>{user} logged in</i> : <Link to="/login" style={{padding: 5}}>login</Link>}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

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
        </div>
    )
}

export default App
