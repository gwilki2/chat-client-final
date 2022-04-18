import chatSlice from "./chatSlice"
import myMsgSound from '../../assets/mixkit-message-pop-alert-2354.mp3'
import otherUserSound from '../../assets/mixkit-long-pop-2358.wav'
import { getMessagesByCount, postMessage } from "../../services/messages"

const {createdSocket, recievedMessage,  recievedInitialMessages} = chatSlice.actions

export const saveChatSocket = (socket) => async dispatch => {
    dispatch(createdSocket(socket))
}

export const recieveNewMessage = (newMessage, currUserId) => async dispatch => {

    try {
        //const newMessage = await getMessageById(messageId) //don't need to contact database to get it, when the socket emitter can send it
        dispatch(recievedMessage(newMessage))
        const audioFile = (newMessage.fromUserId === currUserId) ?  myMsgSound : otherUserSound
        const sound = new Audio(audioFile)
        sound.play()
    } catch (e) {
        console.log('recievedNewMessage caught error', e.message)
    }
}

export const recieveRecentMessages = (count) => async dispatch => {
    try {
        const recentMessages = await getMessagesByCount(count)
        dispatch(recievedInitialMessages(recentMessages))
    } catch (e) {
        console.log('recieveNewMessages caught error', e.message)
    }
}

export const sendMessage = (message, chatSocket) => async dispatch => {
    
    try {
        const messageFromDb = await postMessage(message)
        chatSocket.emit('message', messageFromDb)
        //no need to save anything to the store here, reciver of the emitted(including self) message will save to store
    } catch (e) {
        console.log('failed sendMessage', e.message)
    }

}