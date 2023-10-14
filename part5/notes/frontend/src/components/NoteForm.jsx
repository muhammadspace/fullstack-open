import { useState } from "react"

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: true,
    }
  
    createNote(noteObject)
    setNewNote('')
  }

    return (
        <form onSubmit={ addNote }>
            <input
                value={newNote}
                onChange={handleChange}
            />
            <button type="submit">save</button>
        </form>  
    )
}

export default NoteForm