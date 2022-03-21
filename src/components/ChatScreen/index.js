import { useTranslation } from 'react-i18next'
import Panel from '../UI/Panel'
import styleClasses from './index.module.scss'
import { useTitleBar } from '../../hooks/useTitleBar'
import labels from '../../locale/labels'
import Input from '../UI/Input'
import { Fragment, useRef, useState } from 'react'
import FormButton from '../UI/FormButton'
import { useSelector } from 'react-redux'
import {v4} from 'uuid'
import DisplayMessage from './DisplayMessage'
import beep1 from '../../assets/mixkit-long-pop-2358.wav'

const ChatScreen = () => {

    const { t } = useTranslation()
    const currUser = useSelector(state => state.auth.user)
    const lang = useSelector(state => state.lang)
    
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [lastKeyCode, setLastKeyCode] = useState()
    const scrollAnchorRef = useRef()

    const handleInputChange = e => {
        
        setMessage(e.target.value)
    }

    const handleSendMessage = () => {
        if (message) {
            setMessages(prev => [
                ...prev,
                {
                    ...currUser,
                    message,
                    date: new Date(),
                    msgId: v4(),
                    isCurrUser: true,
                    submittedWithLang: lang
                }
            ]);
            (new Audio(beep1)).play()
            setMessage('')
        }
    }

    const sendOnEnterKey = e => {
        if (e.keyCode === 13 && lastKeyCode === 13) {
            setLastKeyCode(null)
            return handleSendMessage()
        }
        setLastKeyCode(e.keyCode)
    }

    useTitleBar(t(labels.chatWelcome))
    console.log('rendering chatscreen', messages)
    return (
        <div className={styleClasses['chat-screen']}>
            <Panel className={styleClasses['chat-title']}>
                <h1>{`${t(labels.chatWelcome)}!`}</h1>
            </Panel>
            <Panel className={styleClasses['chat-panel']}>
                <div className={styleClasses['chat-messages']}>
                    {messages.map(msg => <DisplayMessage
                        key={msg.msgId}
                        scrollAnchorRef={scrollAnchorRef}
                        message={msg} />)}
                    <div ref={ scrollAnchorRef } id="scrollAnchor"></div>
                </div>
                <div className={styleClasses['send-msg-container']}>
                    <Input
                        labelText={<Fragment>
                            {t(labels.enterMessage)}: <span
                                style={{ fontSize: '.75em' }}
                            >{`(${t(labels.sendDirections)})`}</span>
                        </Fragment>}
                        inputProps={{
                            value: message,
                            onChange: handleInputChange,
                            onKeyUp: sendOnEnterKey
                        }}
                        className={styleClasses['msg-input']}
                        isTextarea={true}
                    />
                    <FormButton buttonProps={{
                        type: 'button',
                        onClick: handleSendMessage, 
                        disabled: !message, 
                        id: 'send-button'
                    }}>{t(labels.send)}</FormButton>
                </div>
            </Panel>
        </div>
    )
}

export default ChatScreen
