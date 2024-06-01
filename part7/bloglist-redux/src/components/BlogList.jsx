import Togglable from "./Togglable.jsx"
import BlogForm from "./BlogForm.jsx"
import Blog from "./Blog.jsx"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initializeBlogsAC } from "../reducers/blogs.reducer"
import "../styles/BlogList.css"
import styled from "styled-components"

const Container = styled.div`
    max-height: 80%;
    width: 80%;
    padding: 0 10px 0 10px;
    margin: auto;
    position: fixed;
    overflow-y: scroll
`

const BlogList = ({ blogFormToggleRef }) => {
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogsAC())
    }, [])

    return (
        <div>
            <h2>blogs</h2>
            <Togglable buttonLabel="create new blog" ref={blogFormToggleRef}>
                <BlogForm blogFormToggleRef={blogFormToggleRef} />
            </Togglable>

            <Container>
                {
                    blogs
                        .toSorted( (a, b) => b.likes - a.likes )
                        .map(blog =>
                            <div className="blog" key={blog.id}>
                                <p><Link to={`/blogs/${blog.id}`}><span className="title">{blog.title}</span> <span className="author"> by {blog.author}</span></Link></p>
                            </div>
                        )
                }
            </Container>
        </div>
    )
}

export default BlogList