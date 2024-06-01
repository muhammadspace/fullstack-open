import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notification.reducer.js"
import blogsReducer from "./reducers/blogs.reducer.js"
import userReducer from "./reducers/user.reducer.js"

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
        user: userReducer
    }
})

export default store