import { useEffect, useState } from 'react'
import { useQuery, useApolloClient } from "@apollo/client"
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'
import { ALL_PERSONS } from './queries'

function App() {
    const client = useApolloClient()
    const [errorMessage, setErrorMessage] = useState("")
    const [token, setToken] = useState(null)
    const persons = useQuery(ALL_PERSONS)

    useEffect(() => {
        const token = localStorage.getItem("phonebook-user-token")

        if (token)
            setToken(token)
    }, [])

    const setError = (message) => {
        setErrorMessage(message)
        setTimeout(() => setErrorMessage(""), 5000)
    }

    const logout = () => {
        localStorage.clear()
        setToken(null)
        client.resetStore()
    }

    if (!token)
    {
        return ( 
            <div>
                { errorMessage && <ErrorMessage message={errorMessage} /> }
                <h1>Login</h1>
                <LoginForm setError={setError} setToken={setToken} />
            </div>
        )
    }

    if (persons.loading)
        return <h1>loading...</h1>

    return (
        <div>
            { errorMessage && <ErrorMessage message={errorMessage} />}
            <button onClick={logout}>logout</button>
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
