import { useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const LoginForm = ({ setError, setToken }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data)
        {
            const token = result.data.login.value
            localStorage.setItem("library-user-token", token)
            setToken(token)
        }
    }, [result.data])

    const handleSubmit = (e) => {
        e.preventDefault()

        login({ variables: { username, password } })
    }

    if (localStorage.getItem("library-user-token"))
        return <Navigate to="/" repalce />

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label id="username" htmlFor="username">username</label>
                    <input id="username" name="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label id="password" htmlFor="password">password</label>
                    <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm