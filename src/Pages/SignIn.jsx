import '../Sass/SignIn.scss'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import  { useState } from 'react'


function SignIn() {
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Log pour vérifier ce qui est envoyé
    console.log({ email: username, password });
  
    // Appel à l'API pour vérifier les identifiants
    fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),  // Remplace 'username' par 'email'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Réponse de l\'API:', data);
  
      // Accéder au body pour obtenir le token ou les données de connexion
      if (data.status === 200) {
        const token = data.body.token;  // Assumes the token is inside the body object

        // sauvegarde le token dans le localStarage
        localStorage.setItem('token', token)
        
        navigate('/user');
      } else {
        alert('Identifiants incorrects ou problème de validation');
      }
    })
    .catch(error => console.error('Erreur de connexion:', error));
  };

    return (
        <>
            <div className="signIn-container">
                <div className="signIn-content">
                    <i className="fa fa-user-circle"></i>
                    <h1 className="signIn-title">Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" name="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button type="submit" className="signIn-button" >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn


// import '../Sass/SignIn.scss'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// function SignIn() {
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [error, setError] = useState(null) // Nouvel état pour gérer les erreurs
//     const navigate = useNavigate()

//     const handleSubmit = (e) => {
//         e.preventDefault()

//         // Réinitialise l'erreur à chaque soumission
//         setError(null)

//         // Log pour vérifier ce qui est envoyé
//         console.log({ email: username, password })

//         // Appel à l'API pour vérifier les identifiants
//         fetch('http://localhost:3001/api/v1/user/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email: username, password }) // Utilise 'email' au lieu de 'username'
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("Réponse de l'API:", data)

//                 if (data.status === 200) {
//                     const token = data.body.token // Assumes the token is inside the body object
//                     console.log('Token:', token)

//                     // Enregistre le token dans le localStorage
//                     localStorage.setItem('token', token)

//                     // Redirige l'utilisateur vers la page utilisateur
//                     navigate('/user')
//                 } else {
//                     // Si l'API retourne une erreur, mettre à jour l'état d'erreur
//                     setError('Identifiants incorrects ou problème de validation')
//                 }
//             })
//             .catch((error) => {
//                 console.error('Erreur de connexion:', error)
//                 setError('Erreur lors de la tentative de connexion.') // Message d'erreur générique
//             })
//     }

//     return (
//         <>
//             <div className="signIn-container">
//                 <div className="signIn-content">
//                     <i className="fa fa-user-circle"></i>
//                     <h1 className="signIn-title">Sign In</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="input-wrapper">
//                             <label htmlFor="username">Username</label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 name="username"
//                                 required
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                         </div>
//                         <div className="input-wrapper">
//                             <label htmlFor="password">Password</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 required
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>
//                         <div className="input-remember">
//                             <input type="checkbox" id="remember-me" name="remember-me" />
//                             <label htmlFor="remember-me">Remember me</label>
//                         </div>
//                         {error && <p className="error-message">{error}</p>}{' '}
//                         {/* Affiche un message d'erreur */}
//                         <button type="submit" className="signIn-button">
//                             Sign In
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default SignIn
