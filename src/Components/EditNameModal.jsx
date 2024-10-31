// EditNameModal.js
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux' // Importation des hooks Redux pour accéder au store
import { fetchUpdateUserName } from '../slices/authSlice'; // Assurez-vous que le chemin est correct

import '../Sass/EditNameModal.scss' // Assurez-vous que ce chemin est correct

function EditNameModal({ isOpen, onClose, onSave, initialFirstName, initialUserName }) {
    
    const [userName, setUserName] = useState(initialUserName)
     const dispatch = useDispatch()
const { token, userInfo } = useSelector((state) => ({
    token: state.auth.token, // Récupère le token d'authentification
    userInfo: state.auth.userInfo // Récupère les informations utilisateur
}))
    // Ne rien afficher si la modal n'est pas ouverte
    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchUpdateUserName(userName))
        // onSave(userName) // Appelle la fonction de sauvegarde
        onClose() // Ferme la modal
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p onClick={onClose}>X</p>
                <h2>Edit Name</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div>
                        <label htmlFor="user-name">Initial Username</label>
                        <p>{userInfo?.userName || 'User'}</p>
                    </div>

                    <div>
                        <label htmlFor="user-name">New Username</label>
                        <input
                            type="text"
                            id="user-name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditNameModal
