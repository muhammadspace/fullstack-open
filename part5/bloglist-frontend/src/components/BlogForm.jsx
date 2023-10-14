import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleCreateBlog = (e) => {
        e.preventDefault()
        createBlog({ title, author, url })
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    return (
        <>
            <h2>Create a blog</h2>
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
        </>
    )
}

export default BlogForm