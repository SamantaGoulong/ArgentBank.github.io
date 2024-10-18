import '../Sass/GreenButton.scss'
import React from 'react'

const GreenButton = ({texte}) => {
    return (
        <>
            <button className="greenButton-container">
                <p className="text">{texte}</p>
            </button>
        </>
    )
}

export default GreenButton
