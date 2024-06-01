import { useState, useEffect, useRef, useContext } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm.jsx"
import Notification from "./components/Notification.jsx"
import ErrorMessage from "./components/ErrorMessage.jsx"
import Togglable from "./components/Togglable.jsx"
import BlogForm from "./components/BlogForm.jsx"
import blogService from "./services/blogs"
import loginService from "./services/login.js"
import { useNotification, useNotificationDispatch } from "./NotificationContext.jsx"
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query"
import { useUser, useUserDispatch } from "./UserContext.jsx"

const App = () => {
    const user = useUser()
    const userDispatch = useUserDispatch()
    const [username, setUsername] = useState("test1")
    const [password, setPassword] = useState("12345678")
    const [errorMessage, setErrorMessage] = useState("")
    const notification = useNotification()
    const notificationDispatch = useNotificationDispatch()
    const blogFormToggleRef = useRef(null)
    const client = useQueryClient()

    const query = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const fetchedBlogs = await blogService.getAll()
            return fetchedBlogs
        },
        refetchOnWindowFocus: false
    })

    const newBlogMutation = useMutation({
        mutationFn: async (blog) => {
            try
            {
                const newBlog = await blogService.create(blog)

                blogFormToggleRef.current.toggleVisibility()

                notificationDispatch({ type: "NOTIFY", payload: `A new blog ${newBlog.title} by ${newBlog.author} added` })
                setTimeout(() => notificationDispatch({ type: "CLEAR" }), 5000)

                console.log("Posted a new blog", newBlog)
                return newBlog
            }
            catch (error)
            {
                setErrorMessage("Couldn't post blog")
                setTimeout(() => setErrorMessage(""), 5000)
                console.error("Couldn't post blog", error)
            }
        },
        onSuccess: (newBlog) => {
            const blogs = client.getQueryData(["blogs"])
            client.setQueryData(["blogs"], blogs.concat(newBlog))
        }
    })

    useEffect(() => {
        console.log("Fetching local user credentials...")
        const user = JSON.parse(window.localStorage.getItem("bloglistLoggedInUser"))

        if (user)
        {
            userDispatch({ type: "SET", payload: user })
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
            userDispatch({ type: "LOGIN", payload: { username, password }})
            setUsername("")
            setPassword("")
            // console.log(`Logging in as ${user.name}`)
        }
        catch (error)
        {
            setErrorMessage("Invalid credentials - couldn't log in.")
            setTimeout(() => setErrorMessage(""), 5000)
            console.error("Invalid credentials - couldn't log in.", error)
        }
    }

    const handleLogout = e => {
        userDispatch({ type: "LOGOUT" })
        console.log("Logged out")
    }

    const handleCreateBlog = async blog => {
        newBlogMutation.mutate(blog)
    }

    const blogs = query.data

    if (query.isLoading)
        return <h1>LOADING...</h1>

    return (
        <div>
            { errorMessage && <ErrorMessage message={ errorMessage } /> }
            {
                !user
                &&
                <Togglable buttonLabel="log in">
                    <LoginForm
                        handleLogin={handleLogin}
                        setPassword={setPassword}
                        setUsername={setUsername}
                        username={username}
                        password={password}
                    />
                </Togglable> }
            { 
                user && 
                <>
                    <h2>blogs</h2>
                    { notification && <Notification message={ notification } /> }
                    <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

                    <Togglable buttonLabel="create new blog" ref={blogFormToggleRef}>
                        <BlogForm createBlog={handleCreateBlog} />
                    </Togglable>

                    {
                        blogs
                            .toSorted( (a, b) => b.likes - a.likes )
                            .map(blog =>
                                <Blog key={blog.id} blog={blog} user={user}/>
                            )
                    }
                </>
            }
        </div>
    )
}

export default App