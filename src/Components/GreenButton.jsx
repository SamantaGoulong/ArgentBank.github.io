// import '../Sass/GreenButton.scss'
// import React from 'react'

// const GreenButton = ({texte}) => {
//     return (
//         <>
//             <button className="greenButton-container">
//                 <p className="text">{texte}</p>
//             </button>
//         </>
//     )
// }

// export default GreenButton
import React from 'react'
import '../Sass/GreenButton.scss' // Chemin d'importation des styles

function GreenButton({ texte, onClick }) {
    return (
        <button className="greenButton-container" onClick={onClick}>
            <p className="text"> {texte}</p>
        </button>
    )
}

export default GreenButton