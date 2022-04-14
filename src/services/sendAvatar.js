const axios = require('axios')

const sendAvatar = async (url, file) => {
    
    try {
        const result = await axios.put(url, file)
        return result    
    } catch (error) {
        throw new Error(error)
    }
}

export default sendAvatar
