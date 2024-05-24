import { useEffect } from "react"
import { useDispatch } from "react-redux"

import NewNote from "./components/NewNote.jsx"
import Filter from "./components/Filter.jsx"
import Notes from "./components/Notes.jsx"
import { initializeNotesAC } from "./reducers/noteReducer.js"

function App() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(initializeNotesAC())
    }, [])

    return (
        <div>
            <NewNote/>
            <Filter/>
            <Notes/>
        </div>
    )
}

export default App
