import { GET_POSTS } from '../actions/post.action' // Importation de la constante d'action GET_POSTS

// État initial du réducteur, ici un objet vide
const initialState = {}

// Définition du réducteur postReducer
export default function postReducer(state = initialState, action) {
    // switch pour gérer les actions en fonction de leur type
    switch (action.type) {
        case GET_POSTS:
            // Si l'action est GET_POSTS, retourne la payload de l'action comme nouvel état
            return action.payload
        default:
            // Pour toute autre action, retourne l'état actuel sans changement
            return state
    }
}
