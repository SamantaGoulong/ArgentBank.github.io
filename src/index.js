import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './Pages/App'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

// Configuration du store Redux avec le réducteur racine et activation des outils de développement
const store = configureStore({
    reducer: rootReducer,
    devTools: true
})

// Création d'un élément racine pour rendre l'application dans le DOM
const root = ReactDOM.createRoot(document.getElementById('root'))

// Rendu de l'application React
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)

// Fonction pour mesurer et rapporter les performances de l'application
reportWebVitals()
