import { createContext, useReducer, useContext } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";

const UserContext = createContext()

const userReducer = (state, action) => {
    switch (action.type)
    {
    case "LOGIN":
    {
        const user = loginService.login(action.payload).then(user => {
            blogService.setToken(user.token)
            window.localStorage.setItem("bloglistLoggedInUser", JSON.stringify(user))
            return user
        })

        return user
    }
    case "LOGOUT":
        blogService.setToken(null)
        window.localStorage.removeItem("bloglistLoggedInUser")
        return null
    case "SET":
        blogService.setToken(action.payload.token)
        return action.payload
    default:
        return state
    }
}

export const UserContextProvider = ({ children }) => {
    const [user, dispatch] = useReducer(userReducer, null)

    return (
        <UserContext.Provider value={[user, dispatch]}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const [user] = useContext(UserContext)

    return user
}

export const useUserDispatch = () => {
    const [user, dispatch] = useContext(UserContext)

    return dispatch
}

export default UserContext