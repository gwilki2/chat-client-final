import { awsFilesUrl, avatarByGender, chatServerUrl } from '../config/appConfig'

const buildAvatarSrc = avatarPathAndName => {
    for (let key in avatarByGender) {
        if (avatarByGender[key] === avatarPathAndName.split('/')[1]) return chatServerUrl + avatarPathAndName
        
        return awsFilesUrl + avatarPathAndName
    }
}

export default buildAvatarSrc