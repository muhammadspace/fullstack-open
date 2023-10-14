import "../styles/Notification.css"

const Notification = ({ message }) => {
    return (
        <div className="notification">
            <p>{ message }</p>
        </div>
    )
}

export default Notification