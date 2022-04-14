import { createSlice } from "@reduxjs/toolkit";
import chatAPI from '../../apis/chatAPI'

const initialState = {
    user: JSON.parse(localStorage.getItem('user'))|| {}, 
    token: localStorage.getItem('token') || '', 
    isLoggedIn: !!localStorage.getItem('token') 
}

if (initialState.token) chatAPI.defaults.headers['Authorization'] = `Bearer ${initialState.token}`

export default createSlice({
    name: 'auth', 
    initialState, 
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

