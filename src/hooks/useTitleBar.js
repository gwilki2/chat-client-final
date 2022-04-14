import { useEffect } from "react"
import {titleText, titleIcon} from '../config/appConfig'

export const useTitleBar = (title, iconSrc) => {
    
    useEffect(() => {
            document.title = title || titleText
            document.getElementById('title-bar-icon').href = iconSrc || titleIcon
        
        return () => {
            document.title = titleText
            document.getElementById('title-bar-icon').href = titleIcon
        }
    })
}



