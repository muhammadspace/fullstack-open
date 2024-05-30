import { useContext, useEffect, useRef } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
    const [notification, notificationDispatch] = useContext(NotificationContext)
    const timeoutRef = useRef(null)

    useEffect(() => {

        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
                notificationDispatch({ type: "HIDE" })
            }, 5000)

    }, [notification])

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }
  
    if (!notification) return null


    return (
        <div style={style}>
            {notification.message}
        </div>
    )
}

export default Notification
