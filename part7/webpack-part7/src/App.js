import React, { useEffect, useState } from "react"
import axios from "axios"

const useNotes = (BACKEND_URL) => {
    const [notes, setNotes] = useState([])
    
    useEffect(() => {
        (async () => {
            const response = await axios.get(BACKEND_URL)
            setNotes(response.data)
        })()
    }, [])

    return notes
}

const App = () => {
    const [counter, setCounter] = useState(0)
    const [arr, setArr] = useState([])
    const notes = useNotes(BACKEND_URL)

    return (
        <div className="container">
            <h1>Hello, Webpack!</h1>
            <p>{counter}</p>
            <button onClick={() => setCounter(counter+1)}>+</button>
            <button onClick={() => setCounter(counter-1)}>-</button>
            <button onClick={() => setCounter(0)}>0</button>
            <button onClick={() => setArr(arr.concat(0))}>concat</button>
            <br/>
            <p>{notes.length} notes on the server at {BACKEND_URL}</p>
        </div>
    )
}

export default App