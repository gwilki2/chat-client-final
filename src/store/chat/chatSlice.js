import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'chat', 
    initialState: {
        socket: {}, 
        messages: []
    }, 
    reducers: {
        createdSocket: (state, action) => {
            state.socket = action.payload
        }, 
        recievedMessage: (state, action) => {
            console.log(action.payload)
            state.messages.push(action.payload)
        }
    }
})