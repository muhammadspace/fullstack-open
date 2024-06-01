import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import blogService from "../services/blogs.js"
import "../styles/Blog.css"

const Blog = ({ blog, user }) => {
    const [areDetailsVisible, setAreDetailsVisible] = useState(false)
    const queryClient = useQueryClient()
    const likeBlogMutation = useMutation({
        mutationFn: async (blog) => {
            const updates = {
                ...blog,
                likes: blog.likes + 1,
                user: blog.user.id
            }

            return await blogService.update(blog.id, updates)
        },
        onSuccess: (updatedBlog) => {
            const blogs = queryClient.getQueryData(["blogs"])
            queryClient.setQueryData(["blogs"], blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
        }
    })

    const deleteBlogMutation = useMutation({
        mutationFn: async (blog) => {
            await blogService.del(blog.id)
        },
        onSuccess: () => {
            const blogs = queryClient.getQueryData(["blogs"])
            queryClient.setQueryData(["blogs"], blogs.filter(b => b.id !== blog.id))
        }
    })

    const toggleDetails = () => { setAreDetailsVisible(!areDetailsVisible) }

    const handleLike = async e => {
        e.preventDefault()
        likeBlogMutation.mutate(blog)
    }

    const handleRemove = async e => {
        e.preventDefault()

        if (confirm(`Remove blog ${blog.title} by ${blog.author}?`))
        {
            deleteBlogMutation.mutate(blog)
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