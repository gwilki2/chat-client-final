import axios from 'axios'
import defaults from '../assets/defaults'

export default axios.create({
    baseURL: defaults.chatApiUrl
})