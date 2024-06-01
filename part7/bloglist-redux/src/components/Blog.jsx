import { useSelector, useDispatch } from "react-redux"
import { useMatch } from "react-router-dom"
import { useState } from "react"
import { deleteBlogAC, likeBlogAC, commentAC } from "../reducers/blogs.reducer.js"

const Blog = () => {
    const match = useMatch("/blogs/:id")
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()
    const [comment, setComment] = useState("")

    const blog = match
        ? blogs.find(b => b.id === match.params.id)
        : null

    const handleLike = async e => {
        e.preventDefault()
        await dispatch(likeBlogAC(blog))
    }

    const handleRemove = async e => {
        e.preventDefault()

        if (confirm(`Remove blog ${blog.title} by ${blog.author}?`))
        {
            await dispatch(deleteBlogAC(blog))
        }
    }

    const handleComment = () => {
        console.log(blog.id, comment)
        dispatch(commentAC(blog.id, comment))
        setComment("")
    }

    if (!blog)
        return null

    return (
        <div>
            <h1>{blog.title}</h1>
            <p>
                <a href={blog.url}>{blog.url}</a>
            </p>
            <p>
                {blog.likes} likes
                <button onClick={handleLike}>like</button>
            </p>
            <p>added by {blog.user.name}</p>

            <div>
                <h5>comments</h5>
                <input type="text" name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)}/><button onClick={handleComment}>comment</button>
                <ul>
                    {
                        blog.comments?.map(comment => 
                            <li key={Math.floor(Math.random() * 100)}>{comment}</li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Blog