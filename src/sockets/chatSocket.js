import socketIoClient from 'socket.io-client'
import {chatServerUrl} from '../config/appConfig'

export default socketIoClient.connect(chatServerUrl)

