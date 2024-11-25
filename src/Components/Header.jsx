import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import argentBankLogo from '../assets/Images/argentBankLogo.webp'
import '../Sass/Header.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserData } from '../slices/authActions'
import { logout} from '../slices/authSlice'
function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Récupère le token et les informations utilisateur du store Redux
    const token = useSelector((state) => state.auth.token)
    const userInfo = useSelector((state) => state.auth.userInfo)

    // Effet pour récupérer les informations utilisateur
    useEffect(() => {
        // Vérifie si le token existe et si les infos utilisateur ne sont pas encore chargées
        if (token && !userInfo) {
            dispatch(fetchUserData())
        }
    }, [token, userInfo, dispatch])

    // Fonction de gestion de la déconnexion
    const handleSignOut = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <nav className="nav-container">
            <Link to="/" className="link-nav-logo">
                <img src={argentBankLogo} alt="Argent Bank logo" className="link-nav-img" />
            </Link>
            <div className="nav-links">
                {token ? ( // Vérifie si le token est présent pour afficher l'option de déconnexion
                    <div className="SignOut">
                        <span onClick={handleSignOut} className="link-nav-sign-out">
                            <i className="fa fa-user-circle"></i>
                            {userInfo?.userName || 'User'}
                            <i className="fa fa-sign-out"></i> Sign Out
                        </span>
                    </div>
                ) : (
                    // Si le token n'est pas présent, afficher le lien de connexion
                    <div className="SignIn">
                        <Link to="/SignIn" className="link-nav-sign-in">
                            <i className="fa fa-user-circle"></i> Sign In
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Header
