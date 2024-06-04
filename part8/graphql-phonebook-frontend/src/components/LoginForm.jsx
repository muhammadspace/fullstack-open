import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"
import { useEffect, useState } from "react"

const LoginForm = ({ setToken, setError }) => {
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
            const token = result?.data?.login?.value
            localStorage.setItem("phonebook-user-token", token)
            setToken(token)
        }
    }, [result.data])

    const onSubmit = e => {
        e.preventDefault()
    
        login({ variables: { username, password } })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username" id="username">username</label>
                    <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password" id="password">password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm