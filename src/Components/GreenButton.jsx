import React from 'react'
import '../Sass/GreenButton.scss' 

function GreenButton({ texte, onClick }) {
    return (
        <button className="greenButton-container" onClick={onClick}>
            <p className="text"> {texte}</p>
        </button>
    )
}

export default GreenButton