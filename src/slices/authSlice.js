import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Action pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
    const { username, password } = credentials 

    try {
        // On effectue une requête POST pour tenter de connecter l'utilisateur
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password }) 
        })

        const data = await response.json() 
        if (response.ok) {
            const token = data.body.token 
            localStorage.setItem('token', token) 
            thunkAPI.dispatch(fetchUserData()) 
            return { token } 
        } else {
    
            return thunkAPI.rejectWithValue(data.message || 'Erreur de connexion')
        }
    } catch (error) {
        // Gestion des erreurs de réseau
        return thunkAPI.rejectWithValue('Erreur réseau')
    }
})

// Action pour récupérer les informations de l'utilisateur après connexion
export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, thunkAPI) => {
    const token = localStorage.getItem('token') 

    try {
        // On effectue une requête GET pour récupérer les données utilisateur
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        })

        const data = await response.json() 
        if (response.ok) {
            return data.body
        } else {
          
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
        const token = localStorage.getItem('token') 

        try {
            // On effectue une requête PUT pour mettre a jour le user name
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userName: newUserName })
            })

            const data = await response.json() 
            if (response.ok) {
                return data.body 
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
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        userInfo: null, 
        status: 'idle', 
        error: null 
    },
    reducers: {
        // Action pour déconnecter l'utilisateur
        logout: (state) => {
            localStorage.removeItem('token')
            state.token = null 
            state.userInfo = null 
            state.status = 'idle' 
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
            
    }
})

// Exportation de l'action de déconnexion
export const { logout } = authSlice.actions
export default authSlice.reducer 
