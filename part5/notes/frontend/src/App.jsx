import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import LoginForm from "./components/LoginForm.jsx"
import NoteForm from "./components/NoteForm.jsx"
import Togglable from "./components/Togglable.jsx"
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from "./services/login.js"

const App = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState("user1")
    const [password, setPassword] = useState("12345678")
    const [user, setUser] = useState(null)
    const noteFormToggleRef = useRef(null)

  useEffect( () => {
    console.log("Attempting to fetch credentials from localStorage...")
    const localUser = JSON.parse(window.localStorage.getItem("noteAppLoggedInUser"))

    if (localUser)
    {
      setUser(localUser)
      noteService.setToken(localUser.token)
      console.log(`Local credentials found. Logged in as ${localUser.name}`)
    }
    else
      console.log("No local credentials found.")
  }, [])

  useEffect(() => {    
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const createNote = (note) => {
    noteService.create(note, user.token)
        .then(returnedNote => {
            setNotes(notes.concat(returnedNote))
            console.log(noteFormToggleRef)
            noteFormToggleRef.current.toggleVisibility()
        })
  }

  const handleLogin = async e => {
    e.preventDefault()
    
    try
    {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("noteAppLoggedInUser", JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    }
    catch (error)
    {
      setErrorMessage("Invalid credentials")
      setTimeout( () => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = e => {
    e.preventDefault()
    window.localStorage.removeItem("noteAppLoggedInUser")
    setUser(null)
    setUsername("")
    setPassword("")
    console.log("Logged out")
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        { user === null 
        ? <Togglable buttonLabel="log in"> 
            <LoginForm
                handleLogin={handleLogin}
                handleUsernameChange={setUsername}                
                handlePasswordChange={setPassword}
                username={username}
                password={password}
            />
        </Togglable>
        : null
        }
        {
        user && 
            <div>
                <p>
                    {user.name} logged in
                    <button onClick={handleLogout}>log out</button>
                </p>
                <Togglable buttonLabel="create" ref={noteFormToggleRef}>
                    <NoteForm createNote={ createNote } />
                </Togglable>
            </div>
      }
      <div>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all' }
            </button>
      </div>      
      <ul>
            {notesToShow.map(note => 
            <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
            />
            )}
        </ul>
        <Footer />
    </div>
  )
}

export default App