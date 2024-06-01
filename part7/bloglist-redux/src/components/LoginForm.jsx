import { useDispatch } from "react-redux"
import { loginAC } from "../reducers/user.reducer.js"
import PropTypes from "prop-types"

const LoginForm = ({ setErrorMessage }) => {
    const dispatch = useDispatch()

    const handleLogin = async e => {
        e.preventDefault()

        try
        {
            const loggedInUser = await dispatch(loginAC({ username: e.target.username.value, password: e.target.password.value }))
            e.target.username.value = ""
            e.target.password.value = ""

            console.log(`Logging in as ${loggedInUser.name}`)
        }
        catch (error)
        {
            setErrorMessage("Invalid credentials - couldn't log in.")
            setTimeout(() => setErrorMessage(""), 5000)
            console.error("Invalid credentials - couldn't log in.", error)
        }
    }

    return (
        <>
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">username</label>
                <input
                    data-testid="username"
                    name="username"
                    type="text"
                />
                <br/>
                <label htmlFor="password">password</label>
                <input
                    data-testid="password"
                    name="password"
                    type="password"
                />
                <br />
                <button>login</button>
            </form>
        </>
    )
}

LoginForm.propTypes = {
    setErrorMessage: PropTypes.func.isRequired
}
export default LoginForm