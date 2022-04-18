import { useTranslation } from 'react-i18next'
import Panel from '../UI/Panel'
import styleClasses from './index.module.scss'
import { useTitleBar } from '../../hooks/useTitleBar'
import labels from '../../locale/labels'
import Input from '../UI/Input'
import { Fragment, useRef, useState } from 'react'
import FormButton from '../UI/FormButton'
import { useDispatch, useSelector } from 'react-redux'
//import {v4} from 'uuid'
import DisplayMessage from './DisplayMessage'
//import beep1 from '../../assets/mixkit-long-pop-2358.wav'
import useChatSocket from '../../hooks/useChatSocket'
import { sendMessage } from '../../store/chat/chatActions'

const ChatScreen = () => {

    const { t } = useTranslation()
    const currUser = useSelector(state => state.auth.user)
    const lang = useSelector(state => state.lang)
    const chatSocket = useSelector(state => state.chat.socket)
    const messages = useSelector(state => state.chat.messages)
    const [message, setMessage] = useState('')
    const [lastKeyCode, setLastKeyCode] = useState()
    const scrollAnchorRef = useRef()
    const dispatch = useDispatch()



    //dispatches a call to load up 10 most recent chats
    //imports and save an instance of chatSocket to the store
    //joins chatSocket
    //listens for new messages and dispatches them to the store
    useChatSocket(currUser) 

    const handleInputChange = e => {
        
        setMessage(e.target.value)
    }

    const handleSendMessage = () => {
        
        const newMsg = {
            message, 
            lang
        }
        dispatch(sendMessage(newMsg, chatSocket)) //will emit new chat message to all clients after saving to db, passing socket from store instance

        setMessage('')
    }

    const sendOnEnterKey = e => {
        if (e.keyCode === 13 && lastKeyCode === 13) {
            setLastKeyCode(null)
            return handleSendMessage()
        }
        setLastKeyCode(e.keyCode)
    }

    useTitleBar(t(labels.chatWelcome))
    
    return (
        <div className={styleClasses['chat-screen']}>
            
            <Panel className={styleClasses['chat-panel']}>
                <Panel className={styleClasses['chat-title']}>
                    <h2>{`${t(labels.chatWelcome)}!`}</h2>
                    <h4><span>Warning: </span>Chats are NOT private.  They are shared with all users.</h4>
                </Panel>
                <div className={styleClasses['chat-messages']}>
                    {messages.map(msg => <DisplayMessage
                        key={msg.id}
                        scrollAnchorRef={scrollAnchorRef}
                        message={msg}
                        isFromCurrentUser = {msg.fromUserId===currUser.userId}
                    />)}
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


// <Panel className={styleClasses['chat-title']}>
//                 <h1>{`${t(labels.chatWelcome)}!`}</h1>
//             </Panel>