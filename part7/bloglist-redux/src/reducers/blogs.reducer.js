import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogsSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload
        },
        appendBlog: (state, action) => {
            return state.concat(action.payload)
        },
        removeBlog: (state, action) => {
            return state.filter(b => b.id !== action.payload.id)
        },
        updateBlog: (state, action) => {
            const news = state.map(b => b.id === action.payload.id ? action.payload : b)
            console.log(news)
            return news
        }
    }
})

export const initializeBlogsAC = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log(blogs)
        dispatch(blogsSlice.actions.setBlogs(blogs))
    }
}

export const createBlogAC = (blog) => {
    return async dispatch => {
        const createdBlog = await blogService.create(blog)
        const action = dispatch(blogsSlice.actions.appendBlog(createdBlog))
        return action.payload
    }
}

export const deleteBlogAC = (blog) => {
    return async dispatch => {
        await blogService.del(blog.id)

        dispatch(blogsSlice.actions.removeBlog(blog))
    }
}

export const likeBlogAC = (blog) => {
    return async dispatch => {
        const updates = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        }

        const updatedBlog = await blogService.update(blog.id, updates)

        dispatch(blogsSlice.actions.updateBlog(updatedBlog))
    }
}

export const commentAC = (blogid, comment) => {
    return async dispatch => {
        const response = await blogService.comment(blogid, comment)
        console.log(response)
    }
}

export const { appendBlogAC } = blogsSlice.actions
export default blogsSlice.reducer