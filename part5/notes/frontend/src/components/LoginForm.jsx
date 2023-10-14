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
                    value={username}
                    onChange={({ target }) => handleUsernameChange(target.value)}
                />
                <br/>
                <label htmlFor="password" name="password">password</label>
                <input 
                    type="password" 
                    name="password"
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