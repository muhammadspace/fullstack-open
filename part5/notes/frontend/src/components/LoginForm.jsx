const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username" name="username">username</label>
                <input 
                    type="text" 
                    name="username"
                    id="username"
                    value={username}
                    onChange={({ target }) => handleUsernameChange(target.value)}
                />
                <br/>
                <label htmlFor="password" name="password">password</label>
                <input 
                    type="password" 
                    name="password"
                    id="password"
                    value={password}
                    onChange={({ target }) => handlePasswordChange(target.value)}
                />
                <br/>
                <button>log in</button>
            </form>
        </>
    )
}

export default LoginForm