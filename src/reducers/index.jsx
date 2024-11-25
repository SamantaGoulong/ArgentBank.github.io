import { combineReducers } from 'redux' 
import loginUser from '../slices/authSlice'

// Combinaison de tous les réducteurs dans un seul réducteur principal
export default combineReducers({
    auth: loginUser
})
