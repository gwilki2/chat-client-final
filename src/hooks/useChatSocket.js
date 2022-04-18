import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import chatSocket from '../sockets/chatSocket'
import {saveChatSocket, recieveNewMessage, recieveRecentMessages} from '../store/chat/chatActions'

const useSocket = (user) => {

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(recieveRecentMessages(10))

        console.log('in useSocket user:', user)
        dispatch(saveChatSocket(chatSocket))
        chatSocket.emit('join', user)
        chatSocket.on('message', (message) => {

            dispatch(recieveNewMessage(message, user.userId))
        })

    }, [dispatch, user])

}

export default useSocket