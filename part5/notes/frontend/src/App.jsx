import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from "./services/login.js"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState("user1")
  const [password, setPassword] = useState("12345678")
  const [user, setUser] = useState(null)

  useEffect( () => {
    console.log("Attempting to fetch credentials from localStorage...")
    const localUser = JSON.parse(window.localStorage.getItem("user"))

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

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject, user.token)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

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

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleLogin = async e => {
    e.preventDefault()
    
    try
    {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("user", JSON.stringify(user))
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
    window.localStorage.removeItem(user)
    setUser(null)
    setUsername("")
    setPassword("")
    console.log("Logged out")
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <label htmlFor="username" name="username">username</label>
      <input 
          type="text" 
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
      />
      <br/>
      <label htmlFor="password" name="password">password</label>
      <input 
          type="password" 
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
      />
      <br/>
      <button>login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
      <button type="submit">save</button>
    </form>
  )
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {
        !user && loginForm()
      }
      {
        user && 
          <div>
            <p>
              {user.name} logged in
            <button onClick={handleLogout}>log out</button>
            </p>
            {noteForm()}
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