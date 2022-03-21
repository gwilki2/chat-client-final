import { useEffect } from "react"
import defaults from '../assets/defaults'

export const useTitleBar = (title, iconSrc) => {
    
    useEffect(() => {
            document.title = title || defaults.titleText
            document.getElementById('title-bar-icon').href = iconSrc || defaults.titleIcon
        
        return () => {
            document.title = defaults.titleText
            document.getElementById('title-bar-icon').href = defaults.titleIcon
        }
    })
}



