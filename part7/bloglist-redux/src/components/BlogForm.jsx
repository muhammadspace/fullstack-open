import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { notifyAC, clearAC } from "../reducers/notification.reducer"
import { createBlogAC } from "../reducers/blogs.reducer"
import styled from "styled-components"

const Label = styled.label`
    font-weight: bold;
    color: #333;
    text-transform: uppercase
`

const Input = styled.input`
    display: block;
    background: #FAFAFA;
    padding: 1em;
    border: none;
    border-bottom: 2px solid gray
`

const Button = styled.button`
    border: 3px solid gray;
    background-color: black;
    color: white;
    font-weight: bold;
`

const BlogForm = ({ blogFormToggleRef }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const dispatch = useDispatch()

    const handleCreateBlog = async e => {
        try
        {
            e.preventDefault()
            const blog = { title, author, url }
            const createdBlog = await dispatch(createBlogAC(blog))

            blogFormToggleRef.current.toggleVisibility()

            dispatch(notifyAC(`A new blog ${blog.title} by ${blog.author} added`))
            setTimeout(() => dispatch(clearAC()), 5000)

            console.log("Posted a new blog", createdBlog)

            setTitle("")
            setAuthor("")
            setUrl("")
        }
        catch (error)
        {
            // if (error.response?.status === 400)
            // {
            //     setErrorMessage("Couldn't post blog")
            //     setTimeout(() => setErrorMessage(""), 5000)
            // }
            // else
            // {
            //     setErrorMessage("An error occured: " + error)
            //     setTimeout(() => setErrorMessage(""), 5000)
            // }
            console.error(error)
        }
    }

    return (
        <>
            <h2>Create a blog</h2>
            <form onSubmit={handleCreateBlog}>
                <Label htmlFor="title">title</Label>
                <Input
                    id="title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
                <br/>
                <Label htmlFor="author">author</Label>
                <Input
                    id="author"
                    type="text"
                    name="author"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
                <br/>
                <Label htmlFor="url">url</Label>
                <Input
                    id="url"
                    type="text"
                    name="url"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                /><br/>
                <Button>create</Button>
            </form>
        </>
    )
}

export default BlogForm