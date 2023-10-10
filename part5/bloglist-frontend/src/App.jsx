import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login.js"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("test1")
    const [password, setPassword] = useState("12345678")
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
        setBlogs( blogs )
        )  
    }, [])

    const handleLogin = async e => {
        e.preventDefault()

        try
        {
            const user = await loginService.login({ username, password  })
            console.log(`Logging in as ${user.name}`)
            setUser(user)
            setUsername("")
            setPassword("")
        }
        catch (error)
        {
            console.error("Invalid credentials - couldn't log in.", error)
        }
    }

    const loginForm = () => (
        <>
            <h2>Log in</h2>
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
                    <p>{user.name} logged in</p>    
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    
                    )}
                </>
            }
        </div>
    )
}

export default App