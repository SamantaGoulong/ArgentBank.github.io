// import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes' // Importation des types d'action définis

// // Fonction pour effectuer la connexion d'un utilisateur
// export const loginUser = (email, password) => {
//     // Retourne une fonction asynchrone qui prend dispatch en paramètre
//     return async (dispatch) => {
//         // Envoie une action de type LOGIN_REQUEST pour indiquer le début du processus de connexion
//         dispatch({ type: LOGIN_REQUEST })

//         try {
//             // Effectue une requête POST pour authentifier l'utilisateur
//             const response = await fetch('http://localhost:3001/api/v1/user/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }) // Envoie les identifiants dans le corps de la requête
//             })

//             // Parse la réponse JSON
//             const data = await response.json()

//             // Vérifie si la réponse est OK (code 2xx)
//             if (response.ok) {
//                 // Si la connexion réussit, dispatch une action de succès avec le token et les informations utilisateur
//                 dispatch({
//                     type: LOGIN_SUCCESS,
//                     payload: { token: data.body.token, user: data.body.user }
//                 })
//             } else {
//                 // Si la connexion échoue, dispatch une action de failure avec un message d'erreur
//                 dispatch({
//                     type: LOGIN_FAILURE,
//                     payload: { error: data.message }
//                 })
//             }
//         } catch (error) {
//             // En cas d'erreur de réseau ou d'autres problèmes, dispatch une action de failure
//             dispatch({
//                 type: LOGIN_FAILURE,
//                 payload: { error: 'Erreur de connexion' } // Message d'erreur générique
//             })
//         }
//     }
// }
