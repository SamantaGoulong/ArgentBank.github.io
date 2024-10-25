import React from 'react' // Importation de la bibliothèque React
import ReactDOM from 'react-dom/client' // Importation de la méthode pour rendre l'application dans le DOM
import './index.css' // Importation du fichier CSS pour le style global
import App from './Pages/App' // Importation du composant principal de l'application
import reportWebVitals from './reportWebVitals' // Importation pour mesurer la performance de l'application

import { Provider } from 'react-redux' // Importation du Provider de Redux pour rendre le store accessible
import { configureStore } from '@reduxjs/toolkit' // Importation de la fonction pour configurer le store Redux
import rootReducer from './reducers' // Importation du réducteur racine combiné
import { getPosts } from './actions/post.action' // Importation de l'action pour récupérer les posts
import { getUser } from './actions/user.action' // Importation de l'action pour récupérer les données de l'utilisateur

// Configuration du store Redux avec le réducteur racine et activation des outils de développement
const store = configureStore({
    reducer: rootReducer,
    devTools: true // Permet l'utilisation des outils de développement Redux
})

// Dispatch des actions pour récupérer les posts et l'utilisateur au moment de l'initialisation
store.dispatch(getPosts()) // Récupération des posts
store.dispatch(getUser()) // Récupération des données de l'utilisateur

// Création d'un élément racine pour rendre l'application dans le DOM
const root = ReactDOM.createRoot(document.getElementById('root'))

// Rendu de l'application React
root.render(
    <React.StrictMode>
        {/* REDUX - Fournit le store à toute l'application */}
        <Provider store={store}>
            <App /> {/* Le composant principal de l'application */}
        </Provider>
    </React.StrictMode>
)

// Fonction pour mesurer et rapporter les performances de l'application
reportWebVitals()
