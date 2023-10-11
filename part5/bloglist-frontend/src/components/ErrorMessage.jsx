import "../styles/ErrorMessage.css"

const ErrorMessage = ({ message }) => {
    return (
        <div class="error">
            <p>{ message }</p>
        </div>
    )
}

export default ErrorMessage