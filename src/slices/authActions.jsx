import { createAsyncThunk } from '@reduxjs/toolkit'

// Action pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
    const { username, password } = credentials

    try {
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
        return thunkAPI.rejectWithValue('Erreur réseau')
    }
})

// Action pour récupérer les informations de l'utilisateur après connexion
export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, thunkAPI) => {
    const token = localStorage.getItem('token')

    try {
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
        return thunkAPI.rejectWithValue('Erreur réseau')
    }
})

// Action pour mettre à jour le nom d'utilisateur
export const fetchUpdateUserName = createAsyncThunk(
    'auth/fetchUpdateUserName',
    async (newUserName, thunkAPI) => {
        const token = localStorage.getItem('token')

        try {
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
                return thunkAPI.rejectWithValue(
                    data.message || 'Erreur lors de la mise à jour du nom utilisateur'
                )
            }
        } catch (error) {
            return thunkAPI.rejectWithValue('Erreur réseau')
        }
    }
)
