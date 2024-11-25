import React from 'react'
import { Navigate } from 'react-router-dom' // Importation pour rediriger
import { useSelector } from 'react-redux' // Importation pour accéder au store Redux

const PrivateRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token) // Récupération du token d'authentification

    // Si le token est présent, on affiche les enfants (la route protégée)
    if (token) {
        return children
    }

    // Sinon, on redirige vers la page de connexion
    return <Navigate to="/SignIn" />
}

export default PrivateRoute
