import React from 'react'
import '../Sass/ItemsHome.scss'

const ItemsHome = ({ icon, title, description }) => {
    return (
        <div className="item-content">
            <img src={icon} alt={`${title} Icon`} className="icon" />
            <h3 className="title">{title}</h3>
            < p className="text">{description}</p>
        </div>
    )
}


export default ItemsHome
