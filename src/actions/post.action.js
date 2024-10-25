import axios from 'axios' // Importation de la bibliothèque axios pour les requêtes HTTP

// Définir l'action pour récupérer les posts
export const GET_POSTS = 'GET_POSTS' // Constante pour le type d'action GET_POSTS

// Action pour récupérer les posts
export const getPosts = () => {
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
                // Dispatch de l'action avec le type GET_POSTS et les données récupérées
                dispatch({ type: GET_POSTS, payload: res.data })
            })
            .catch((err) => {
                // Gérer les erreurs en affichant un message d'erreur
                console.error('Erreur : ', err.response) // Afficher l'erreur dans la console
            })
    }
}
