import socketIoClient from 'socket.io-client'
import defaults from '../assets/defaults'

export default socketIoClient.connect(defaults.chatServerUrl)

