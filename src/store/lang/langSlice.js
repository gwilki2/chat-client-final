import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
    name: 'lang',
    initialState: localStorage.getItem('last-lang') || 'en', 
    reducers: {
        languageChanged: (state, action) => action.payload
    }

})