// import '../Sass/User.scss' // Importation des styles spécifiques pour le composant User
// import GreenButton from '../Components/GreenButton' // Importation du composant GreenButton
// import UserCard from '../Components/UserCard' // Importation du composant UserCard
// import { useSelector } from 'react-redux' // Importation du hook useSelector pour accéder au store Redux

// function User() {
//     // Récupère les informations utilisateur depuis le store Redux
//     const userInfo = useSelector((state) => state.auth.userInfo)

//     // Affiche un message de chargement si userInfo est null, ce qui indique que les données ne sont pas encore disponibles
//     if (!userInfo) return <p>Loading user information...</p>

//     return (
//         <div className="user-container">
//             {' '}
//             {/* Conteneur principal du composant User */}
//             <div className="user-content">
//                 {' '}
//                 {/* Conteneur pour le contenu de l'utilisateur */}
//                 <div className="user-content-text">
//                     {' '}
//                     {/* Conteneur pour le texte de bienvenue */}
//                     <h2 className="user-title">Welcome back </h2> {/* Titre de bienvenue */}
//                     <h3 className="user-subtitle">
//                         {/* Affiche le prénom et le nom de l'utilisateur */}
//                         {userInfo.firstName} {userInfo.lastName}
//                     </h3>
//                     <GreenButton texte="Edit Name" />{' '}
//                     {/* Bouton pour éditer le nom de l'utilisateur */}
//                 </div>
//                 <div className="user-content-cards">
//                     {' '}
//                     {/* Conteneur pour les cartes d'informations utilisateur */}
//                     {/* Carte pour le compte courant */}
//                     <UserCard
//                         title="Argent Bank Checking (x8349)" // Titre du compte
//                         amount="$2,082.79" // Montant disponible
//                         description="Available Balance" // Description du solde
//                     />
//                     {/* Carte pour le compte épargne */}
//                     <UserCard
//                         title="Argent Bank Savings (x6712)" // Titre du compte
//                         amount="$10,928.42" // Montant disponible
//                         description="Available Balance" // Description du solde
//                     />
//                     {/* Carte pour la carte de crédit */}
//                     <UserCard
//                         title="Argent Bank Credit Card (x8349)" // Titre de la carte
//                         amount="$184.30" // Solde actuel
//                         description="Current Balance" // Description du solde
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default User // Exportation du composant User
// User.js
import '../Sass/User.scss'; // Importation des styles spécifiques pour le composant User
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GreenButton from '../Components/GreenButton';
import UserCard from '../Components/UserCard';
import EditNameModal from '../Components/EditNameModal';

function User() {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour ouvrir/fermer la modal

    if (!userInfo) return <p>Loading user information...</p>; // Affiche un message si les infos utilisateur ne sont pas encore chargées

    const handleSave = (firstName, lastName) => {
        console.log(`New Name: ${firstName} ${lastName}`);
        // Ici, vous ajouterez votre logique pour mettre à jour le nom de l'utilisateur dans votre store ou via une API
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
            {/* Intégration de la modal pour éditer le nom */}
            <EditNameModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialFirstName={userInfo.firstName}
                initialLastName={userInfo.lastName}
            />
        </div>
    );
}

export default User;
