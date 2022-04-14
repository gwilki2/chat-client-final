const axios = require('axios')
const { awsFilesUrl } = require('../config/appConfig')

axios.create({
    baseUrl: awsFilesUrl
})