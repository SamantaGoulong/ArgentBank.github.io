import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUpdateUserName } from '../slices/authActions'

import '../Sass/EditNameModal.scss'
import GreenButton from './GreenButton'

function EditNameModal({ isOpen, onClose, initialUserName }) {
    const userInfo = useSelector((state) => state.auth.userInfo)
    const [userName, setUserName] = useState(initialUserName)
    const dispatch = useDispatch()

    // Ne rien afficher si la modal n'est pas ouverte
    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchUpdateUserName(userName))
        onClose() // Ferme la modal
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <p className="btn-close" onClick={onClose}>
                    X
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="title">
                        <p>Edit user info</p>
                    </div>

                    <div className="new">
                        <label htmlFor="user-name">User Name</label>
                        <input
                            type="text"
                            id="user-name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="new">
                        <label htmlFor="user-name">First Name</label>
                        <input
                            type="text"
                            id="user-name"
                            value={userInfo.firstName}
                            required
                            disabled
                        />
                    </div>
                    <div className="new">
                        <label htmlFor="user-name">Last Name</label>
                        <input
                            type="text"
                            id="user-name"
                            value={userInfo.lastName}
                            required
                            disabled
                        />
                    </div>

                    <div className="modal-buttons">
                        <GreenButton texte="Save" />
                        <GreenButton texte="Cancel" onClick={onClose}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditNameModal
