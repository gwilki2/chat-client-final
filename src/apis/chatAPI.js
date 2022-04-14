import axios from 'axios'
import {chatServerUrl} from '../config/appConfig'

export default axios.create({
    baseURL: chatServerUrl
})