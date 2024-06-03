import { useState } from 'react'
import { useQuery } from "@apollo/client"
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './queries'
import PhoneForm from './components/PhoneForm'

function App() {
    const [errorMessage, setErrorMessage] = useState("")
    const persons = useQuery(ALL_PERSONS)

    const setError = (message) => {
        setErrorMessage(message)
        setTimeout(() => setErrorMessage(""), 1000)
    }

    if (persons.loading)
        return <h1>loading...</h1>

    return (
        <div>
            { errorMessage && <ErrorMessage message={errorMessage} />}
            <h1>Phonebook</h1>
            <Persons persons={persons.data.allPersons} />
            <PersonForm setError={setError} />
            <PhoneForm setError={setError} />
        </div>
    )
}

const ErrorMessage = ({ message }) => {
    const style = {
        color: "red",
        background: "pink",
        border: "1px solid red",
        padding: 4,
        display: "inline",
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default App
