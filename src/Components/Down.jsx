import React, { useEffect, useState } from 'react'
import '../Sass/Down.scss'
import data from '../data.json' // Assure-toi que le chemin du fichier JSON est correct

function Down() {
    const [items, setItems] = useState([])

    useEffect(() => {
        // Assigne les données JSON à l'état local
        setItems(data)
    }, []) // Le tableau vide [] signifie que useEffect s'exécute une seule fois au montage du composant

    return (
        <>
            <div className="down-content">
                {items.map((item) => (
                    <div key={item.id} className="down-item">
                        <img src={item.picture} alt={item.title} />
                        <h3 className="down-title">{item.title}</h3>
                        <p className="down-text">{item.description}</p>
                    </div>
                   
                ))}
            </div>
        </>
    )
}

export default Down
