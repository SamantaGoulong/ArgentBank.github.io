import '../Sass/SignIn.scss'
import React, { useState } from 'react'

function SignIn() {
    const [username ] = useState('')
    const [password] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    
    return (
        <>
            <div className="signIn-container">
                <div className="signIn-content">
                    <i className="fa fa-user-circle"></i>
                    <h2 className="signIn-title">Sign In</h2>
                    <label htmlFor="username" className="signIn-subtitle">
                        Username
                    </label>
                    <input type="text" id="username" value={username} required />
                    <label htmlFor="password" className="signIn-subtitle">
                        Password
                    </label>
                    <input type="text" id="username" value={password} required />
                    <label className="signIn-checkbox">
                        <input className="signIn-check"  type="checkbox" checked={rememberMe} />
                        Remember me
                    </label>
                    <button type="submit" className="signIn-button">
                        Sign In
                    </button>
                </div>
            </div>
        </>
    )
}

export default SignIn
