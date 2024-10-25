import { GET_USER } from '../actions/user.action' // Importation de la constante d'action GET_USER

// État initial du réducteur, ici un objet vide
const initialState = {}

// Définition du réducteur userReducer
export default function userReducer(state = initialState, action) {
    // Utilisation d'un switch pour gérer les différentes actions en fonction de leur type
    switch (action.type) {
        case GET_USER:
            // Si l'action est GET_USER, retourne la payload de l'action comme nouvel état
            return action.payload
        default:
            // Pour toute autre action, retourne l'état actuel sans changement
            return state
    }
}
