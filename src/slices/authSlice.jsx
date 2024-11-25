import { createSlice } from '@reduxjs/toolkit'
import { loginUser, fetchUserData, fetchUpdateUserName } from './authActions'

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
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userInfo = action.payload
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(fetchUpdateUserName.fulfilled, (state, action) => {
                state.userInfo = action.payload
            })
            .addCase(fetchUpdateUserName.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

// Exportation de l'action de déconnexion
export const { logout } = authSlice.actions
export default authSlice.reducer
