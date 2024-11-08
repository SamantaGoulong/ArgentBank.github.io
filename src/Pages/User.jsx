import '../Sass/User.scss'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import GreenButton from '../Components/GreenButton'
import UserCard from '../Components/UserCard'
import EditNameModal from '../Components/EditNameModal'

function User() {
    const userInfo = useSelector((state) => state.auth.userInfo)
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (!userInfo) return <p>Loading user information...</p>

    const handleSave = (userName) => {
        console.log(`New Name: ${userName}`)
    }

    return (
        <div className="user-container">
            <div className="user-content">
                <div className="user-content-text">
                    <h2 className="user-title">Welcome back</h2>
                    <h3 className="user-subtitle">
                        {userInfo.firstName} {userInfo.lastName}
                    </h3>
                    <GreenButton texte="Edit Name" onClick={() => setIsModalOpen(true)} />
                </div>
                <div className="user-content-cards">
                    <UserCard
                        title="Argent Bank Checking (x8349)"
                        amount="$2,082.79"
                        description="Available Balance"
                    />
                    <UserCard
                        title="Argent Bank Savings (x6712)"
                        amount="$10,928.42"
                        description="Available Balance"
                    />
                    <UserCard
                        title="Argent Bank Credit Card (x8349)"
                        amount="$184.30"
                        description="Current Balance"
                    />
                </div>
            </div>

            <EditNameModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialUserName={userInfo.userName}
            />
        </div>
    )
}

export default User
