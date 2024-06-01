import { useState, useEffect } from "react"
import { useMatch } from "react-router-dom"
import userService from "../services/users"

const User = () => {
    const match = useMatch("/users/:id")
    const [user, setUser] = useState(null)

    useEffect(() => {
        userService.getAll().then(users => setUser(users.find(u => u.id === match.params.id)))
    }, [])

    if (!user)
        return <h1>loading...</h1>

    return (
        <div>
            <h1>{user.name}</h1>
            <h3>added blogs</h3>
            <ul>
                {
                    user.blogs.map(blog => 
                        <li key={blog.id}>{blog.title}</li>
                    )
                }
            </ul>
        </div>
    )
}

export default User