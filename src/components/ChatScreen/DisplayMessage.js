import styleClasses from './DisplayMessage.module.scss'
import { formatDistance } from 'date-fns'
import {es, fr, enUS as en} from 'date-fns/locale'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import labels from '../../locale/labels'
import { useEffect, useState } from 'react'
import buildAvatarSrc from '../../utility/buildAvatarSrc'

const DisplayMessage = ({ message, scrollAnchorRef, isFromCurrentUser }) => {
    
    const {t}= useTranslation()
    const locales = {es, fr, en}
    const lang = useSelector(state => state.lang)
    const locale = locales[lang]
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        setInterval(() => {
            setCurrentDate(new Date())
        }, 15000)
        scrollAnchorRef.current.scrollIntoView(true)
    }, [])

    return (
        <div
            className={
                `${styleClasses['display-message']} 
                ${isFromCurrentUser ? styleClasses['current-user'] : styleClasses['other-user']}`
            }
        >
            <h6 className={styleClasses['message-meta-data']}>
                {`${isFromCurrentUser ? t(labels.you) : message.User.firstName}: ${formatDistance(new Date(message.createdAt), currentDate, {addSuffix: true, locale})}`}
            </h6>
            <div className={styleClasses['message-body']}>
                <img src={buildAvatarSrc(message.User.avatar)} alt="avatar" /> {message.message.split(/\n/).map((msg, i) => <p key={i}>{msg}</p>)}
            </div>
        </div>
    )
}

export default DisplayMessage
