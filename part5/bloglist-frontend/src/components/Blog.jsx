import { useState } from "react"
import blogService from "../services/blogs.js"
import "../styles/Blog.css"

const Blog = ({ blog, setBlogs, user }) => {
    const [areDetailsVisible, setAreDetailsVisible] = useState(false)

    const toggleDetails = () => { setAreDetailsVisible(!areDetailsVisible) }

    const handleLike = async e => {
        e.preventDefault()
        const updates = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        }

        await blogService.update(blog.id, updates)

        const allBlogs = await blogService.getAll()
        setBlogs(allBlogs)
    }

    const handleRemove = async e => {
        e.preventDefault()

        if (confirm(`Remove blog ${blog.title} by ${blog.author}?`))
        {
            await blogService.del(blog.id)

            const allBlogs = await blogService.getAll()
            setBlogs(allBlogs)
        }
    }

    return (
        <div className="blog">
            <p><span className="title">{blog.title}</span> <span className="author">{blog.author}</span> <button onClick={toggleDetails}>view</button></p>
            {
                areDetailsVisible
                &&
                <div className="details">
                    <p className="likes">{blog.likes} likes <button onClick={handleLike}>like</button></p>
                    <p className="url">{blog.url}</p>
                    <p className="user-name">{blog.user.name}</p>
                    {
                        user.username === blog.user.username && <button onClick={handleRemove}>remove</button>
                    }
                </div>
            }
        </div>
    )
}

export default Blog