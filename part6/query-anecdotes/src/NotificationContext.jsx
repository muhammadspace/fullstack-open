import { useContext, createContext, useReducer } from "react";

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type)
    {
        case "POST":
            return action.payload
        case "HIDE":
            return null
        default:
            return null
    }
}

export const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, dispatch]}>
            { props.children }
        </NotificationContext.Provider>
    )
}

export default NotificationContext