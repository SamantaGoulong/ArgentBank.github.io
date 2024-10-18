import '../Sass/UserCard.scss'
import GreenButton from './GreenButton'
import React from 'react'

const UserCard = ({ title, amount , description }) => {
    return (
        <>
            <div className="userCard-content">
                <div className="userCard-content-text">
                    <h3 className="account-title">{title}</h3>
                    <p className="account-amount">{amount}</p>
                    <p className="account-amount-description">{description}</p>
                </div>
                <div className="account-content-wrapper">
                    <GreenButton texte="View description" />
                </div>
            </div>
        </>
    )
}

export default UserCard
