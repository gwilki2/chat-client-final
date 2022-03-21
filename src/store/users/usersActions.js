export const updateUser = (updatedUserData) => async dispatch => {
    try {
        // const response = await updateUserService(updatedUserData)
        // dispatch(updatedUser(response))


    } catch (error) {
        
    }
}

// import { loginService, logoutService, registerService } from '../../services/auth'
// import { changeLanguage } from '../lang/langActions'
// import authSlice from './authSlice'

// const {loggedIn, loggedOut} = authSlice.actions

// export const logIn = (email, password, navigate) => async dispatch => {

//     try {
//         const response = await loginService(email, password) 
//         dispatch(loggedIn(response))
//         dispatch(changeLanguage(response.user.lang))
//         navigate('/')
        
//     } catch (e) {
//         console.log('login request error', e)
//     }

// }

// export const register = (formData) => async dispatch => {
//     try {
//         const response = await registerService(formData)
//     } catch (e) {
        
//     }
// }

// export const logOut = () => async dispatch => {

//     try {
//         await logoutService() 
//         dispatch(loggedOut())
        
//     } catch (e) {
//         console.log('logout request error', e)
//     }

// }