import { useState } from "react"
import "../styles/Blog.css"

const Blog = ({ blog }) => {
    const [areDetailsVisible, setAreDetailsVisible] = useState(false)
    
    const toggleDetails = () => { setAreDetailsVisible(!areDetailsVisible) }
    
    return (
        <div className="blog">
            <p>{blog.title} {blog.author} <button onClick={toggleDetails}>view</button></p>
            {
                areDetailsVisible
                && 
                <div className="details">
                    <p>{blog.likes} likes</p>
                    <p>{blog.url}</p>
                    <p>{blog.user.name}</p>
                </div>
            }
        </div>  
    )
}

export default Blog