import { useSelector, useDispatch } from "react-redux"
import { toggleImportanceAC } from "../reducers/noteReducer.js"

const Note = ({ note, toggleImportance }) => {
    return (
        <li 
            onClick={() => toggleImportance( note.id )}>
            { note.content } { note.important }
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => {
        if (state.filter === "ALL")
            return state.notes

        return state.filter === "IMPORTANT" 
            ? state.notes.filter( note => note.important )
            : state.notes.filter( note => !note.important )
    })

    const toggleImportance = (id) => {
        dispatch(toggleImportanceAC(id))
    }

    return (
        <ul>
            {
            notes?.map( note => <Note key={note.id} note={note} toggleImportance={toggleImportance}/> )
            }
        </ul>
    )
}

export default Notes