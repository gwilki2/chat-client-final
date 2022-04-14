import { loginService, logoutService, registerService, updateUserService } from '../../services/auth'
import { changeLanguage } from '../lang/langActions'
import authSlice from './authSlice'
import i18n from '../../locale/i18n'
import labels from '../../locale/labels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/pro-duotone-svg-icons'
import sendAvatar from '../../services/sendAvatar'

const {loggedIn, loggedOut, registered, updatedUser} = authSlice.actions

export const logIn = (email, password, navigate) => async dispatch => {

    try {
        const response = await loginService(email, password) 
        dispatch(loggedIn(response))
        dispatch(changeLanguage(response.user.lang))
        navigate('/')
        
    } catch (e) {
        console.log('login request error')
        throw e
    }

}

export const register = (formData, navigate, setStatusMsg, avatarFile) => async dispatch => {
    try {
        setStatusMsg('Sending Account request... Please Wait...')
        const response = await registerService(formData)
        if (response.uploadUrl && avatarFile) {
            await sendAvatar(response.uploadUrl, avatarFile)
        }
        dispatch(registered(response))
        dispatch(changeLanguage(response.user.lang))
        setStatusMsg('')
        navigate('/')
    } catch (e) {
        console.log('register request error', e)
        setStatusMsg(i18n.t(labels.genericError))
        setTimeout(() => {
            setStatusMsg('')
        }, 2000)

    }
}

export const logOut = () => async dispatch => {

    try {
        await logoutService() 
        dispatch(loggedOut())
        
    } catch (e) {
        console.log('logout request error', e)
    }

}

export const updateUser = (updatedUserData, setStatusMsg, avatarFile) => async dispatch => {
    try {
        setStatusMsg(<FontAwesomeIcon icon={faSpinner} />)
        const response = await updateUserService(updatedUserData)
        console.log(response)
        if (response.uploadUrl) {
            await sendAvatar(response.uploadUrl, avatarFile)
        }

        dispatch(updatedUser(response))
        dispatch(changeLanguage(response.user.lang))
        setStatusMsg(i18n.t(labels.accountUpdated))
        setTimeout(() => {
            setStatusMsg('')
        }, 2000)


    } catch (e) {
        setStatusMsg(i18n.t(labels.genericError))
        console.log('update user request error', e)
        setTimeout(() => {
            setStatusMsg('')
        }, 2000)
    }
}