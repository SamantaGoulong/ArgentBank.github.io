import axios from 'axios' // Importation de la bibliothèque axios pour les requêtes HTTP

// Définir l'action pour récupérer l'utilisateur
export const GET_USER = 'GET_USER' // Constante pour le type d'action GET_USER

// Action pour récupérer les données de l'utilisateur
export const getUser = () => {
    // Retourne une fonction qui prend dispatch comme paramètre
    return (dispatch) => {
        // Récupérer le token stocké dans localStorage pour l'authentification
        const token = localStorage.getItem('token')

        // Faire la requête GET à l'API pour récupérer les données utilisateur
        return axios
            .get('http://localhost:3001/api/v1/user/profile', {
                headers: {
                    // Ajouter le token dans l'en-tête Authorization pour authentifier la requête
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res) // Log de la réponse de l'API pour vérifier la structure des données
                // Dispatch de l'action avec le type GET_USER et les données récupérées
                dispatch({ type: GET_USER, payload: res.data.body })
            })
            .catch((err) => {
                // Gérer les erreurs en affichant un message d'erreur
                console.error('Erreur : ', err.response) // Afficher l'erreur dans la console
            })
    }
}
