import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Action pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
    const { username, password } = credentials // On extrait le nom d'utilisateur et le mot de passe des paramètres

    try {
        // On effectue une requête POST pour tenter de connecter l'utilisateur
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password }) // On envoie les données au serveur
        })

        const data = await response.json() // On récupère la réponse en JSON
        if (response.ok) {
            const token = data.body.token // Si la connexion a réussi, on récupère le token
            localStorage.setItem('token', token) // On sauvegarde le token dans le stockage local
            thunkAPI.dispatch(fetchUserData()) // Appelle pour récupérer les infos utilisateur après connexion
            return { token } // On retourne le token pour mettre à jour l'état
        } else {
            // Si la connexion a échoué, on renvoie le message d'erreur
            return thunkAPI.rejectWithValue(data.message || 'Erreur de connexion')
        }
    } catch (error) {
        // Gestion des erreurs de réseau
        return thunkAPI.rejectWithValue('Erreur réseau')
    }
})

// Action pour récupérer les informations de l'utilisateur après connexion
export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, thunkAPI) => {
    const token = localStorage.getItem('token') // On récupère le token stocké

    try {
        // On effectue une requête GET pour récupérer les données utilisateur
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // On ajoute le token dans les en-têtes pour l'authentification
            }
        })

        const data = await response.json() // On récupère la réponse en JSON
        if (response.ok) {
            return data.body // Si la requête réussit, on retourne les données utilisateur
        } else {
            // Si la requête échoue, on renvoie le message d'erreur
            return thunkAPI.rejectWithValue(
                data.message || 'Erreur lors de la récupération des données utilisateur'
            )
        }
    } catch (error) {
        // Gestion des erreurs de réseau
        return thunkAPI.rejectWithValue('Erreur réseau')
    }
})

//action pour mettre a jour le user name
export const fetchUpdateUserName = createAsyncThunk(
    'auth/fetchUpdateUserName',
    async (newUserName, thunkAPI) => {
        const token = localStorage.getItem('token') // On récupère le token stocké

        try {
            // On effectue une requête PUT pour mettre a jour le user name
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` // On ajoute le token dans les en-têtes pour l'authentification
                },
                body: JSON.stringify({ userName: newUserName })
            })

            const data = await response.json() // On récupère la réponse en JSON
            if (response.ok) {
                return data.body // Si la requête réussit, on retourne les données utilisateur
            } else {
                // Si la requête échoue, on renvoie le message d'erreur
                return thunkAPI.rejectWithValue(
                    data.message || 'Erreur lors de la récupération des données utilisateur'
                )
            }
        } catch (error) {
            // Gestion des erreurs de réseau
            return thunkAPI.rejectWithValue('Erreur réseau')
        }
    }
)

const authSlice = createSlice({
    name: 'auth', // Nom du slice
    initialState: {
        token: localStorage.getItem('token') || null, // On initialise l'état avec le token si disponible
        userInfo: null, // Ajout de userInfo pour stocker les informations de l’utilisateur
        status: 'idle', // État de la requête (idle, loading, succeeded, failed)
        error: null // Pour stocker les messages d'erreur
    },
    reducers: {
        // Action pour déconnecter l'utilisateur
        logout: (state) => {
            localStorage.removeItem('token') // On retire le token du stockage local
            state.token = null // On réinitialise le token dans l'état
            state.userInfo = null // Réinitialise également les informations utilisateur
            state.status = 'idle' // On remet l'état à 'idle'
        }
    },
    extraReducers: (builder) => {
        // Gestion des différents états de la connexion
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading' // Indique que la connexion est en cours
                state.error = null // Réinitialise les erreurs précédentes
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded' // Connexion réussie
                state.token = action.payload.token // Met à jour le token dans l'état
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed' // Connexion échouée
                state.error = action.payload // Stocke le message d'erreur
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userInfo = action.payload // Stocke les informations utilisateur dans l’état
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.error = action.payload // Stocke le message d'erreur
            })
            .addCase(fetchUpdateUserName.fulfilled, (state, action) => { // succès
                state.userInfo = action.payload // Stocke les informations utilisateur dans l’état
            })
            .addCase(fetchUpdateUserName.rejected, (state, action) => { // echec
                state.error = action.payload // Stocke le message d'erreur
            })
            // .addCase(fetchUserInfo.fulfilled, (state, action) => {
            //     state.userInfo = action.payload // Met à jour les informations utilisateur
            //     state.status = 'succeeded' // Indique que la récupération des données a réussi
            // })
            // .addCase(fetchUserInfo.rejected, (state) => {
            //     state.userInfo = null // Réinitialise userInfo en cas d'échec
            //     state.status = 'failed' // Indique que la récupération des données a échoué
            // })
    }
})

// Exportation de l'action de déconnexion
export const { logout } = authSlice.actions
export default authSlice.reducer // Exportation du reducer
