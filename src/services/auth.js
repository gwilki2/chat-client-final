import chatAPI from '../apis/chatAPI'

const setLocalStorageAndHeaders = ({ user, token } = {}) => {

    if (user && token) {
        chatAPI.defaults.headers['Authorization'] = `Bearer ${token}`
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }
    else {
        chatAPI.defaults.headers['Authorization'] = ''
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }
}
// export const loginService = async (email, password) => {
//     try {
//         const { data } = await chatAPI.post('/login', {email, password})
//         setLocalStorageAndHeaders(data)
//         return data
//     } catch (e) {
//         console.log('loginservice', e.response.data.error)
//         throw new Error('test error loginservice')
//     }
// }

export const loginService = async (email, password) => {
    try {
        const { data } = await chatAPI.post('/login', {email, password})
        setLocalStorageAndHeaders(data)
        return data
    } catch (e) {
        console.log('loginservice', e.response.data.error)
        throw e
    }
}

export const registerService = async (formData) => {
    try {
        const { data } = await chatAPI.post('/register', formData)
        setLocalStorageAndHeaders(data)
        return data
    } catch (e) {
        throw new Error(e)
    }
}

export const updateUserService = async (formData) => {
    try {
        const { data } = await chatAPI.post('/update', formData)
        setLocalStorageAndHeaders(data)
        return data
    } catch (e) {
        throw new Error(e)
    }
}

export const logoutService = async () => {
    try {
        setLocalStorageAndHeaders()        
    } catch (e) {
        throw new Error(e)
    }
}

