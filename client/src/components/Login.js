import { useState } from 'react'
import { NavLink } from "react-router-dom"

function Login({ attemptedLogin }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    function handleSubmit(e) {
        e.preventDefault()
        attemptedLogin({ username, password })
    }

    return (
        <div id="login">
            <h1 id="login-header">Nue Kid On The Block.</h1> 
            <form id="login-form" onSubmit={handleSubmit}>
                <div  className="login-input-group">
                <input className="username-input" type="text"
                    onChange={handleChangeUsername}
                    value={username}
                    placeholder='username'
                />

                <input className="password-input" type="text"
                    onChange={handleChangePassword}
                    value={password}
                    placeholder='password'
                />
                </div>
                <div className="login-btn-group" >
                <input className="login-btn" type="submit"
                    value='Login'
                />
                

                <nav>
                    <NavLink to="/create-profile">Create Profile</NavLink>
                </nav>
                </div>

            </form>
        </div>

    )

}


export default Login