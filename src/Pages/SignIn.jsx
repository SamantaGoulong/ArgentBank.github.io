import '../Sass/SignIn.scss' // Importation des styles spécifiques pour la page de connexion
import React, { useState, useEffect } from 'react' // Importation des hooks React
import { useDispatch, useSelector } from 'react-redux' // Importation des hooks Redux
import { useNavigate } from 'react-router-dom' // Importation de useNavigate pour la redirection
import { loginUser, fetchUserData } from '../slices/authSlice' // Importation des actions Redux pour la connexion et la récupération des données utilisateur

function SignIn() {
    // Initialise les états locaux pour le formulaire de connexion
    const [username, setUsername] = useState('') // État pour le nom d'utilisateur
    const [password, setPassword] = useState('') // État pour le mot de passe
    const dispatch = useDispatch() // Initialise useDispatch pour déclencher les actions Redux
    const navigate = useNavigate() // Initialise useNavigate pour la redirection après connexion

    // Sélection des états du store Redux pour suivre l'état d'authentification
    const authStatus = useSelector((state) => state.auth.status) // Récupère l'état d'authentification
    const error = useSelector((state) => state.auth.error) // Récupère les messages d'erreur
    const userInfo = useSelector((state) => state.auth.userInfo) // Récupère les informations utilisateur

    // Charge les informations utilisateur si un token est déjà présent dans le stockage local
    useEffect(() => {
        if (localStorage.getItem('token')) {
            // Vérifie si un token est stocké
            dispatch(fetchUserData()) // Si oui, on récupère les données utilisateur
        }
    }, [dispatch]) // On ne dépend que de dispatch pour cette effet

    // Redirige vers la page utilisateur si l'authentification a réussi et les infos utilisateur sont disponibles
    useEffect(() => {
        if (authStatus === 'succeeded' && userInfo) {
            // Vérifie si l'authentification a réussi
            navigate('/user') // Redirige vers la page utilisateur
        }
    }, [authStatus, userInfo, navigate]) // Dépend des états d'authentification et de navigation

    // Gestion de la soumission du formulaire de connexion
    const handleSubmit = (e) => {
        e.preventDefault() // Empêche le rechargement de la page
        // Déclenche l'action loginUser avec les identifiants fournis
        dispatch(loginUser({ username, password }))
            .unwrap() // Permet de gérer les promesses de manière plus fluide
            .then(() => {
                // Charge les infos utilisateur une fois connecté
                dispatch(fetchUserData()) // Appelle fetchUserData pour récupérer les données de l'utilisateur
            })
            .catch(() => {
                // Affiche un message d'alerte en cas d'échec de la connexion
                alert('Identifiants incorrects ou problème de validation')
            })
    }

    return (
        <div className="signIn-container">
            {' '}
            {/* Conteneur principal du formulaire de connexion */}
            <div className="signIn-content">
                {' '}
                {/* Contenu du formulaire */}
                <i className="fa fa-user-circle"></i> {/* Icône pour l'utilisateur */}
                <h1 className="signIn-title">Sign In</h1> {/* Titre du formulaire */}
                <form onSubmit={handleSubmit}>
                    {' '}
                    {/* Formulaire avec gestion de la soumission */}
                    {/* Champ pour le nom d'utilisateur */}
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>{' '}
                        {/* Étiquette pour le champ nom d'utilisateur */}
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required // Champ requis
                            value={username} // Lien avec l'état local
                            onChange={(e) => setUsername(e.target.value)} // Mise à jour de l'état lors de la saisie
                        />
                    </div>
                    {/* Champ pour le mot de passe */}
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>{' '}
                        {/* Étiquette pour le champ mot de passe */}
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required // Champ requis
                            value={password} // Lien avec l'état local
                            onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état lors de la saisie
                        />
                    </div>
                    {/* Option pour se souvenir de l'utilisateur */}
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" name="remember-me" />{' '}
                        {/* Case à cocher pour se souvenir */}
                        <label htmlFor="remember-me">Remember me</label>{' '}
                        {/* Étiquette pour la case à cocher */}
                    </div>
                    {/* Bouton de soumission, désactivé si l'état d'authentification est "loading" */}
                    <button
                        type="submit"
                        className="signIn-button"
                        disabled={authStatus === 'loading'} // Désactivation si en cours de chargement
                    >
                        {authStatus === 'loading' ? 'Loading...' : 'Sign In'}{' '}
                        {/* Texte du bouton */}
                    </button>
                    {/* Affiche un message d'erreur si l'authentification échoue */}
                    {error && <p className="error-message">{error}</p>}{' '}
                    {/* Affichage conditionnel d'un message d'erreur */}
                </form>
            </div>
        </div>
    )
}

export default SignIn // Exportation du composant SignIn
