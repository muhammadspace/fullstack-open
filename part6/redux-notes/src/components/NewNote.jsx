import { createNoteAC } from "../reducers/noteReducer.js"
import { useDispatch } from "react-redux"

const NewNote = () => {
    const dispatch = useDispatch()

    const addNote = async (e) => {
        e.preventDefault()

        const content = e.target.note.value
        dispatch(createNoteAC(content))

        e.target.note.value = ""
    }

    return (
        <form onSubmit={addNote}>
            <input name="note" type="text"/>
            <button type="submit">add</button>
        </form>
    )
}

export default NewNote