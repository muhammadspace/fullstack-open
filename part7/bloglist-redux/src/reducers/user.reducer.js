import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login.js"
import blogService from "../services/blogs.js"

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUserAC: (state, action) => {
            const user = action.payload
            console.log(action)

            blogService.setToken(user.token)
            window.localStorage.setItem("bloglistLoggedInUser", JSON.stringify(user))
            return user
        },
        logoutAC: (action, payload) => {
            blogService.setToken(null)
            window.localStorage.removeItem("bloglistLoggedInUser")
            console.log("Logged out")
            return null
        }
    }
})

export const { setUserAC, logoutAC } = userSlice.actions

export const loginAC = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        dispatch(setUserAC(user))

        return user
    }
}

export const intiializeUserAC = () => {
    return dispatch => {
        console.log("Fetching local user credentials...")
        const user = JSON.parse(window.localStorage.getItem("bloglistLoggedInUser"))

        if (user)
        {
            dispatch(setUserAC(user))
            console.log(`Logged in as ${user.name}`)
        }
        else
        {
            console.log("No local user credentials found. Please log in")
        }
    }
}

export default userSlice.reducer