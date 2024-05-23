import { createSlice } from "@reduxjs/toolkit"

const generateId = () => {
    return (Math.random() * 100000).toFixed(0)
}

const initialState = [
    {
        content: "note 1",
        important: false,
        id: 1
    },
    {
        content: "note 2",
        important: true,
        id: 2
    }
]

const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        createNoteAC(state, action)
        {
            const note = { content: action.payload, important: false, id: generateId() }

            return state.concat(note)
        },
        toggleImportanceAC(state, action)
        {
            const id = action.payload
            const noteToChange = state.find( note => note.id === id )
            const changedNote = { ...noteToChange, important: !noteToChange.important }

            return state.map( note => note.id === id ? changedNote : note )
        }
    }
})

export const { createNoteAC, toggleImportanceAC } = noteSlice.actions
export default noteSlice.reducer