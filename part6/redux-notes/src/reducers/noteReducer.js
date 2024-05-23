const generateId = () => {
    return (Math.random() * 100000).toFixed(0)
}

const noteReducer = (state = [], action) => {
    switch (action.type)
    {
        case "NEW_NOTE":
        {
            return state.concat(action.payload)
        }
        case "TOGGLE_IMPORTANCE":
        {
            const noteToChange = state.find( note => note.id === action.payload.id )
            const changedNote = { ...noteToChange, important: !noteToChange.important }

            return state.map( note => note.id === action.payload.id ? changedNote : note )
        }
    }
}

export const createNoteAC = (content, important = false) => {
    return {
        type: "NEW_NOTE",
        payload: {
            content,
            important,
            id: generateId()
        }
    }
}

export const toggleImportanceAC = (id) => {
    return {
        type: "TOGGLE_IMPORTANCE",
        payload: {
            id
        }
    }
}

export default noteReducer