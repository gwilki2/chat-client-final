const axios = require('axios')

module.exports = async (url, file) => {
    

    try {
        const result = await axios.put(url, file)
        return result    
    } catch (error) {
        throw new Error(error)
    }
}
    