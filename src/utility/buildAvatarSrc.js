import { awsFilesUrl, avatarByGender, chatServerUrl } from '../config/appConfig'

const buildAvatarSrc = avatarPathAndName => {
    for (let key in avatarByGender) {
        if (avatarByGender[key] === avatarPathAndName) return chatServerUrl + avatarPathAndName
    }
    return awsFilesUrl + avatarPathAndName
}

export default buildAvatarSrc