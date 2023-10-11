import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification.jsx"
import ErrorMessage from "./components/ErrorMessage.jsx"
import blogService from './services/blogs'
import loginService from "./services/login.js"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("test1")
    const [password, setPassword] = useState("12345678")
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const [notification, setNotification] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        blogService.getAll().then(blogs =>
        setBlogs( blogs )
        )  
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

    const handleCreateBlog = async e => {
        e.preventDefault()

        try
        {
            const newBlog = await blogService.create({ title, author, url })
            setBlogs(blogs.concat(newBlog))
            setNotification(`A new blog ${title} by ${author} added`)
            setTimeout(() => setNotification(""), 5000)
            setTitle("")
            setAuthor("")
            setUrl("")
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
                    <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

                    <form onSubmit={handleCreateBlog}>
                        <label htmlFor="title">title</label>
                        <input 
                            type="text"
                            name="title"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                        <br/>
                        <label htmlFor="author">author</label>
                        <input 
                            type="text"
                            name="author"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                        <br/>
                        <label htmlFor="url">url</label>
                        <input 
                            type="text"
                            name="url"
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        /><br/>
                        <button>create</button>
                    </form>
                    
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    
                    )}
                </>
            }
        </div>
    )
}

export default App