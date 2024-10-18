// import '../Sass/Header.scss'
// import argentBankLogo from '../assets/Images/argentBankLogo.png'
// import { Link } from 'react-router-dom'

// function Header() {
//     return (
//         <>
//             <nav className="nav-container">
//                 <Link to="/" className={`link-nav-logo`}>
//                     <img src={argentBankLogo} alt="Argent Bank logo" className={`link-nav-img`} />
//                 </Link>
//                 <div className='test'>
//                 <div className="SignIn">
//                     <Link to="/SignIn" className={`link-nav-sign-in`}>
//                         <i className="fa fa-user-circle"></i>
//                         Sign In
//                     </Link>
//                 </div>
//                 <div className="SignOut">
//                     <Link to="/" className={`link-nav-sign-out`}>
//                         <i className="fa fa-user-circle"></i>
//                         Tony
//                         <i className="fa fa-sign-out"></i>
//                         Sign Out
//                     </Link>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     )
// }

// export default Header



import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import argentBankLogo from '../assets/Images/argentBankLogo.png'
import '../Sass/Header.scss'
import { useSelector } from 'react-redux'

function Header() {
const user = useSelector((state) => state.userReducer)
console.log(user)

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // Vérifie si un token est présent dans le localStorage
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
        }
    }, [])

    const handleSignOut = () => {
        // Supprime le token lors de la déconnexion
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        navigate('/') // Redirige vers la page d'accueil
    }

    return (
        <>
            <nav className="nav-container">
                <Link to="/" className={`link-nav-logo`}>
                    <img src={argentBankLogo} alt="Argent Bank logo" className={`link-nav-img`} />
                </Link>
                <div className="nav-links">
                    {isLoggedIn ? (
                        <div className="SignOut">
                            <span onClick={handleSignOut} className={`link-nav-sign-out`}>
                                <i className="fa fa-user-circle"></i>
                                {user.firstName}
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </span>
                        </div>
                    ) : (
                        <div className="SignIn">
                            <Link to="/SignIn" className={`link-nav-sign-in`}>
                                <i className="fa fa-user-circle"></i>
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Header
