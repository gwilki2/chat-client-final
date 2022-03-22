import chatSlice from "./chatSlice"
import myMsgSound from '../../assets/mixkit-message-pop-alert-2354.mp3'
import otherUserSound from '../../assets/mixkit-long-pop-2358.wav'

const {createdSocket, recievedMessage} = chatSlice.actions

export const createSocket = (socket) => async dispatch => {

    dispatch(createdSocket(socket))

}

export const recieveMessage = (message, currUserId) => async dispatch => {
    message.isCurrUser = message.userId === currUserId
    delete message.createdAt
    delete message.updatedAt
    const audioFile = message.isCurrUser ?  myMsgSound : otherUserSound
    
    dispatch(recievedMessage(message))

    const sound = new Audio(audioFile)
    sound.play()
    

}