import "../styles/Notification.css"

const Notification = ({ message }) => {
    return (
        <div class="notification">
            <p>{ message }</p>
        </div>
    )
}

export default Notification