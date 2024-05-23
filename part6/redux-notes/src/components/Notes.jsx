import { useSelector, useDispatch } from "react-redux"

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
    const notes = useSelector(state => state ? state.concat() : null)

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