import noteService from "../services/notes.service.js"
import { createSlice } from "@reduxjs/toolkit"

const generateId = () => {
    return (Math.random() * 100000).toFixed(0)
}

const noteSlice = createSlice({
    name: "notes",
    initialState: [],
    reducers: {
        appendNoteAC(state, action)
        {
            return state.concat(action.payload)
        },
        toggleImportanceAC(state, action)
        {
            const id = action.payload
            const noteToChange = state.find( note => note.id === id )
            const changedNote = { ...noteToChange, important: !noteToChange.important }

            return state.map( note => note.id === id ? changedNote : note )
        },
        setNotesAC(state, action)
        {
            return action.payload
        }
    }
})

export const { appendNoteAC, toggleImportanceAC, setNotesAC } = noteSlice.actions

export const initializeNotesAC = () => {
    return async dispatch => {
        const notes = await noteService.getAll()
        dispatch(setNotesAC(notes))
    }
}

export const createNoteAC = (content) => {
    return async dispatch => {
        const newNote = await noteService.createNote(content)
        dispatch(noteSlice.actions.appendNoteAC(newNote))
    }
}

export default noteSlice.reducer