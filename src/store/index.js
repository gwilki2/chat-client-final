import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import chatSlice from './chat/chatSlice'
import langSlice from './lang/langSlice'

export default configureStore({
    reducer: {
        lang: langSlice.reducer, 
        auth: authSlice.reducer, 
        chat: chatSlice.reducer
    }, 
    middleware:  (getDefaultMiddleware) =>  getDefaultMiddleware({
        serializableCheck: false,
    })
})