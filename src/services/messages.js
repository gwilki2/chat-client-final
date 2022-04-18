import chatAPI from '../apis/chatAPI'

export const postMessage = async (message) => {
    
    try {
        const { data } = await chatAPI.post('/message/new', message)
        return data
    } catch (e) {
        throw new Error(e)
    }
    
}

export const getMessageById = async (messageId) => {
    
    try {
        const { data } = await chatAPI.get(`/message/find/${messageId}`)
        return data
    } catch (e) {
        throw new Error(e)
    }
    
}

export const getMessagesByCount =  async (count) => {
    
    try {
        const { data } = await chatAPI.get(`/messages/${count}`)
        return data
    } catch (e) {
        throw new Error(e)
    }
    
}