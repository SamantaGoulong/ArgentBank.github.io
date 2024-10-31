import React, { useEffect } from 'react' // Importation de React et du hook useEffect
import { Link, useNavigate } from 'react-router-dom' // Importation de Link et useNavigate pour la navigation
import argentBankLogo from '../assets/Images/argentBankLogo.webp' // Importation du logo de l'application
import '../Sass/Header.scss' // Importation des styles spécifiques pour l'en-tête
import { useSelector, useDispatch } from 'react-redux' // Importation des hooks Redux pour accéder au store
import { logout, fetchUserData } from '../slices/authSlice' // Importation des actions Redux pour déconnexion et récupération des infos utilisateur

function Header() {
    const dispatch = useDispatch() // Initialise useDispatch pour déclencher les actions Redux
    const navigate = useNavigate() // Initialise useNavigate pour la redirection

    // Récupère le token et les informations utilisateur du store Redux
    const { token, userInfo } = useSelector((state) => ({
        token: state.auth.token, // Récupère le token d'authentification
        userInfo: state.auth.userInfo // Récupère les informations utilisateur
    }))
    

    // Effet pour récupérer les informations utilisateur si un token est présent mais pas encore d'infos utilisateur
    useEffect(() => {
        if (token && !userInfo) {
            // Vérifie si le token existe et si les infos utilisateur ne sont pas encore chargées
            dispatch(fetchUserData()) // Déclenche l'action pour récupérer les infos utilisateur
        }
    }, [token, userInfo, dispatch]) // Dépend des états token et userInfo

    // Fonction de gestion de la déconnexion
    const handleSignOut = () => {
        dispatch(logout()) // Déclenche l'action de déconnexion
        navigate('/') // Redirige vers la page d'accueil après la déconnexion
    }

    return (
        <nav className="nav-container">
            {' '}
            {/* Conteneur de la barre de navigation */}
            <Link to="/" className="link-nav-logo">
                {' '}
                {/* Lien vers la page d'accueil avec le logo */}
                <img src={argentBankLogo} alt="Argent Bank logo" className="link-nav-img" />{' '}
                {/* Logo de l'application */}
            </Link>
            <div className="nav-links">
                {' '}
                {/* Conteneur pour les liens de navigation */}
                {token ? ( // Vérifie si le token est présent pour afficher l'option de déconnexion
                    <div className="SignOut">
                        <span onClick={handleSignOut} className="link-nav-sign-out">
                            {' '}
                            {/* Span pour déclencher la déconnexion */}
                            <i className="fa fa-user-circle"></i> {/* Icône utilisateur */}
                            {userInfo?.userName || 'User'}{' '}
                            {/* Affiche le prénom de l'utilisateur ou 'User' par défaut */}
                            <i className="fa fa-sign-out"></i> Sign Out{' '}
                            {/* Icône de déconnexion et texte */}
                        </span>
                    </div>
                ) : (
                    // Si le token n'est pas présent, afficher le lien de connexion
                    <div className="SignIn">
                        <Link to="/SignIn" className="link-nav-sign-in">
                            {' '}
                            {/* Lien vers la page de connexion */}
                            <i className="fa fa-user-circle"></i> Sign In{' '}
                            {/* Icône utilisateur et texte de connexion */}
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Header // Exportation du composant Header
