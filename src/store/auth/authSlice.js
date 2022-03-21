import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'auth', 
    initialState: {
        user: JSON.parse(localStorage.getItem('user'))|| {}, 
        token: localStorage.getItem('token') || '', 
        isLoggedIn: !!localStorage.getItem('token') 
    }, 
    reducers: {
        loggedIn: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn = true
        },
        loggedOut: (state, action) => {
            return {
                user: {}, 
                token: '', 
                isLoggedIn: false
            }
        }, 
        registered: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn = true
        }, 
        updatedUser: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        }
    }
})

