import { useState, useEffect, useRef } from "react"
import LoginForm from "./components/LoginForm.jsx"
import Notification from "./components/Notification.jsx"
import ErrorMessage from "./components/ErrorMessage.jsx"
import Togglable from "./components/Togglable.jsx"
import BlogForm from "./components/BlogForm.jsx"
import Blog from "./components/Blog.jsx"
import BlogList from "./components/BlogList.jsx"
import UsersView from "./components/UsersView.jsx"
import User from "./components/User.jsx"
import { Routes, Route, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { intiializeUserAC, logoutAC } from "./reducers/user.reducer.js"
import styled from "styled-components"

const Page = styled.div`
    background: white;
    font-family: arial;
    position: absolute;
    overflow: hidden;
    height: 99vh;
`

const linkStyle = {
    textDecoration: "none",
    color: "slateblue",
    fontWeight: "bold",
    margin: 5
}

const Button = styled.button`
    border: 3px solid gray;
    background-color: black;
    color: white;
    font-weight: bold;
`

const App = () => {
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")
    const blogFormToggleRef = useRef(null)
    const notification = useSelector(state => state.notification)
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(intiializeUserAC())
    }, [])

    const handleLogout = e => {
        dispatch(logoutAC())
    }

    return (
        <Page>
            <div>
                <Link style={linkStyle} to="/users">users</Link>
                <Link style={linkStyle} to="/">blogs</Link>
                {
                    !user
                    &&
                    <Togglable buttonLabel="log in">
                        <LoginForm setErrorMessage={setErrorMessage} />
                    </Togglable> 
                }
                {
                    user && 
                    <p>{user.name} logged in <Button onClick={handleLogout}>logout</Button></p>
                }

                <Routes>
                    <Route path="/users" element={<UsersView />}/>
                    <Route path="/users/:id" element={<User />}/>
                    <Route path="/" element={<BlogList blogFormToggleRef={blogFormToggleRef} />}/>
                    <Route path="/blogs/:id" element={<Blog />}/>
                </Routes>
            </div>

            { 
                errorMessage && 
                <ErrorMessage message={ errorMessage } />
            }
            {
                notification &&
                <Notification message={ notification } />
            }
        </Page>
    )
}

export default App