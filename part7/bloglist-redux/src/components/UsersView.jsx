import { useEffect, useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import User from "./User"
import userService from "../services/users"
import BlogList from "./BlogList"

const UsersView = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll().then(users => setUsers(users))
    }, [])

    return (
        <>
            <table>
                <tbody>
                    {
                        users.map(user => 
                            <tr key={user.id}>
                                <td>
                                    <Link to={`./${user.id}`}>{user.name}</Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default UsersView