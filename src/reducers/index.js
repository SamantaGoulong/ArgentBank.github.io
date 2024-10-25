import { combineReducers } from 'redux' // Importation de la fonction combineReducers depuis Redux
import userReducer from './user.reducer' // Importation du réducteur pour gérer l'état de l'utilisateur
import postReducer from './post.reducer' // Importation du réducteur pour gérer les posts// import userSlice from "./slices/userSlice"; // Importation potentielle d'un autre réducteur pour gérer l'utilisateur (commenté)
import loginUser from '../slices/authSlice' // Importation du réducteur de connexion qui gère l'authentification

// Combinaison de tous les réducteurs dans un seul réducteur principal
export default combineReducers({
    userReducer, // Réducteur pour l'état de l'utilisateur
    postReducer, // Réducteur pour l'état des posts
    // userSlice, // Un autre réducteur potentiel pour gérer l'état de l'utilisateur (commenté)
    auth: loginUser // Réducteur pour gérer l'authentification
})
