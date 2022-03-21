import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import langSlice from './lang/langSlice'

export default configureStore({
    reducer: {
        lang: langSlice.reducer, 
        auth: authSlice.reducer
    }
})