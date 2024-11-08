import '../Sass/SignIn.scss'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, fetchUserData } from '../slices/authSlice'

function SignIn() {
    // Initialise les états locaux pour le formulaire de connexion
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Sélection des états du store Redux pour suivre l'état d'authentification
    const authStatus = useSelector((state) => state.auth.status)
    const error = useSelector((state) => state.auth.error)
    const userInfo = useSelector((state) => state.auth.userInfo)

    // Charge les informations utilisateur si un token est déjà présent dans le stockage local
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchUserData())
        }
    }, [dispatch])

    // Redirige vers la page utilisateur si l'authentification a réussi et les infos utilisateur sont disponibles
    useEffect(() => {
        if (authStatus === 'succeeded' && userInfo) {
            navigate('/user')
        }
    }, [authStatus, userInfo, navigate])

    // Gestion de la soumission du formulaire de connexion
    const handleSubmit = (e) => {
        e.preventDefault()
        // Déclenche l'action loginUser avec les identifiants fournis
        dispatch(loginUser({ username, password }))
            .unwrap()
            .then(() => {
                dispatch(fetchUserData())
            })
            .catch(() => {
                console.error('Erreur de connexion :', error)
            })
    }

    return (
        <div className="signIn-container">
            <div className="signIn-content">
                <i className="fa fa-user-circle"></i>
                <h1 className="signIn-title">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" name="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button
                        type="submit"
                        className="signIn-button"
                        disabled={authStatus === 'loading'}>
                        {authStatus === 'loading' ? 'Loading...' : 'Sign In'}
                    </button>
                    {error && <p className="error-message">Username or password is incorrect</p>}
                </form>
            </div>
        </div>
    )
}

export default SignIn
