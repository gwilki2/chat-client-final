import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import socket from '../sockets/chatSocket'
import {createSocket, recieveMessage} from '../store/chat/chatActions'

const useSocket = (user) => {

    const dispatch = useDispatch()
    useEffect(() => {

        console.log('in useSocket user:', user)
        dispatch(createSocket(socket))
        socket.emit('join', user)
        socket.on('message', (message) => {

            // console.log('in message event', JSON.parse(message))
            dispatch(recieveMessage(message, user.userId))
        })

    }, [dispatch, user])

}

export default useSocket