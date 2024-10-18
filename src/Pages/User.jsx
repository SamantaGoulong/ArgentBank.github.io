import '../Sass/User.scss'
import GreenButton from '../Components/GreenButton'
import UserCard from '../Components/UserCard'
import { useSelector } from 'react-redux'

function User() {
    const user = useSelector((state) => state.userReducer);
console.log(user);

    return (
        <>
            <div className="user-container">
                <div className="user-content">
                    <div className="user-content-text">
                        <h2 className="user-title">Welcome back </h2>
                        <h3 className="user-subtitle">
                            {user.firstName} {user.lastName}
                        </h3>
                        <GreenButton texte="Edit Name" />
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
            </div>
        </>
    )
}

export default User




// import '../Sass/User.scss'
// import GreenButton from '../Components/GreenButton'
// import UserCard from '../Components/UserCard'
// import { useSelector } from 'react-redux'
// import { useEffect, useState } from 'react'

// function User() {
//     const user = useSelector((state) => state.userReducer)
//     console.log(user)
//     const [isOwner, setIsOwner] = useState(false) // État pour vérifier si l'utilisateur connecté est le propriétaire du compte

//     useEffect(() => {
//         // Vérification basée sur le token ou un identifiant stocké
//         const token = localStorage.getItem('token')

//         if (user && token) {
//             // Si le token est lié à l'utilisateur récupéré
//             setIsOwner(true) // On suppose que l'utilisateur est le propriétaire s'il y a un token valide
//         }
//     }, [user])
//     return (
//         <>
//             <div className="user-container">
//                 <div className="user-content">
//                     <div className="user-content-text">
//                         <h2 className="user-title">Welcome back </h2>
//                         <h3 className="user-subtitle">
//                             {user.firstName} {user.lastName}
//                         </h3>
//                         {/* Afficher le bouton Edit Name seulement si l'utilisateur est propriétaire */}
//                         {isOwner && <GreenButton texte="Edit Name" />}
//                     </div>
//                     <div className="user-content-cards">
//                         <UserCard
//                             title="Argent Bank Checking (x8349)"
//                             amount="$2,082.79"
//                             description="Available Balance"
//                         />
//                         <UserCard
//                             title="Argent Bank Savings (x6712)"
//                             amount="$10,928.42"
//                             description="Available Balance"
//                         />
//                         <UserCard
//                             title="Argent Bank Credit Card (x8349)"
//                             amount="$184.30"
//                             description="Current Balance"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default User
