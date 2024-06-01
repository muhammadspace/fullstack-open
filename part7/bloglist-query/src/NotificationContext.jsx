import { createContext, useReducer, useContext } from "react"

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type)
    {
    case "NOTIFY":
        return action.payload
    case "CLEAR":
        return ""
    default:
        return ""
    }
}

export const NotificationContextProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, "")

    return <NotificationContext.Provider value={[notification, dispatch]}>
        { children }
    </NotificationContext.Provider>
}

export const useNotification = () => {
    const [notification] = useContext(NotificationContext)

    return notification
}

export const useNotificationDispatch = () => {
    const [notification, dispatch] = useContext(NotificationContext)

    return dispatch
}

export default NotificationContext