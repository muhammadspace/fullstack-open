import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification.jsx"
import ErrorMessage from "./components/ErrorMessage.jsx"
import Togglable from "./components/Togglable.jsx"
import BlogForm from "./components/BlogForm.jsx"
import blogService from './services/blogs'
import loginService from "./services/login.js"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("test1")
    const [password, setPassword] = useState("12345678")
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const blogFormToggleRef = useRef(null)

    useEffect(() => {
        blogService.getAll().then(fetchedBlogs=> {
            setBlogs( fetchedBlogs )
            console.log(fetchedBlogs)
        })  
    }, [])

    useEffect(() => {
        console.log("Fetching local user credentials...")
        const user = JSON.parse(window.localStorage.getItem("bloglistLoggedInUser"))

        if (user)
        {
            setUser(user)
            blogService.setToken(user.token)
            console.log(`Logged in as ${user.name}`)
        }
        else
        {
            console.log("No local user credentials found. Please log in")
        }
    }, [])

    const handleLogin = async e => {
        e.preventDefault()

        try
        {
            const user = await loginService.login({ username, password  })
            blogService.setToken(user.token)
            window.localStorage.setItem("bloglistLoggedInUser", JSON.stringify(user))
            setUser(user)
            setUsername("")
            setPassword("")
            console.log(`Logging in as ${user.name}`)
        }
        catch (error)
        {
            setErrorMessage("Invalid credentials - couldn't log in.")
            setTimeout(() => setErrorMessage(""), 5000)
            console.error("Invalid credentials - couldn't log in.", error)
        }
    }

    const handleLogout = e => {
        blogService.setToken(null)
        window.localStorage.removeItem("bloglistLoggedInUser")
        setUser(null)
        console.log("Logged out")
    }

    const handleCreateBlog = async blog => {
        try
        {
            const newBlog = await blogService.create(blog)
            const newBlogList = await blogService.getAll()
            setBlogs(newBlogList)

            blogFormToggleRef.current.toggleVisibility()

            setNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`)
            setTimeout(() => setNotification(""), 5000)

            console.log("Posted a new blog", newBlog)
        }
        catch (error)
        {
            setErrorMessage("Couldn't post blog")
            setTimeout(() => setErrorMessage(""), 5000)
            console.error("Couldn't post blog", error)
        }
    }
    
    const loginForm = () => (
        <>
            <h2>Log in</h2>
            { errorMessage && <ErrorMessage message={ errorMessage } /> }
            <form onSubmit={handleLogin}>
                <label htmlFor="username">username</label>
                <input 
                    name="username" 
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                <br/>
                <label htmlFor="username">password</label>
                <input 
                    name="password" 
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                <br />
                <button>login</button>
            </form>
        </>
    )

    return (
        <div>
            { !user && loginForm() }
            { user && <>
                    <h2>blogs</h2>
                    { notification && <Notification message={ notification } /> }
                    { errorMessage && <ErrorMessage message={ errorMessage } /> }
                    <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

                    <Togglable buttonLabel="create new blog" ref={blogFormToggleRef}>
                        <BlogForm createBlog={handleCreateBlog} />
                    </Togglable>
                    
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    
                    )}
                </>
            }
        </div>
    )
}

export default App