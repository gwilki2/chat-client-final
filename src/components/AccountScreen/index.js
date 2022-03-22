import { Link, useNavigate } from 'react-router-dom'
import FormButton from '../UI/FormButton'
import Input from '../UI/Input'
import Panel from '../UI/Panel'
import Select from '../UI/Select'
import styleClasses from './index.module.scss'
import { useTranslation } from 'react-i18next'
import labels from '../../locale/labels'
import { useTitleBar } from '../../hooks/useTitleBar'
import formIcon from '../../assets/list-check-duotone.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import { register, updateUser } from '../../store/auth/authActions'
import FileInput from '../UI/FileInput'

const AccountScreen = ({ type = 'create' }) => {

    const { t } = useTranslation()
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const [firstName, setFirstName] = useState(user.firstName || '')  // using || ''  to set empty string for the register/create user version of this component.  
    const [lastName, setLastName] = useState(user.lastName || '')
    // const [lang, setLang] = useState('') //cant controll select boxes,  BUT can defaultValue them. Also, not using the tracked values in the end.  Instead using FormData
    // const [gender, setGender] = useState('')
    // const [avatar, setAvatar] = useState(user.avatar || '') //cant/shouldn't controll file type input.  Also using FormData from event object in the end, so need for tracking. 
    const [email, setEmail] = useState(user.email || '')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [statusMsg, setStatusMsg] = useState('')

    const flashError = (errorMsg) => {
        setStatusMsg(errorMsg)
        setTimeout(() => {
            setStatusMsg('')
        }, 2000)
    }
    const avatarInputComponentRef = useRef()
    const defaultLangRef = useRef()
    const genderRef = useRef()


    const screenTitle = type === 'create' ? t(labels.registration) : t(labels.editAccount)

    useTitleBar(screenTitle, formIcon)

    const handleNavigateBack = () => {
        navigate(-1)
    }
    const handleClearFields = () => {
        setFirstName('')
        setLastName('')
        defaultLangRef.current.value = ''
        avatarInputComponentRef.current.removeAllFiles()
        genderRef.current.value = ''
        setEmail('')
        setConfirmPassword('')
        setPassword('')
        
    }

    const onSubmitAccount = e => {
        e.preventDefault()

        if (password !== confirmPassword) return flashError(t(labels.failedPasswordConfirm))
        const formData = new FormData(e.target)
        //console.log(formData)
        type === 'create' ? dispatch(register(formData, navigate, setStatusMsg)) : dispatch(updateUser(formData, setStatusMsg))
        avatarInputComponentRef.current.removeAllFiles()
        setPassword('')
        setConfirmPassword('')

    }
    const handleInputChange = e => {
        switch (e.target.name) {
            case 'firstName':
                setFirstName(e.target.value)
                break
            case 'lastName':
                setLastName(e.target.value)
                break
            case 'email':
                setEmail(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            case 'confirmPassword':
                setConfirmPassword(e.target.value)
                break
            default:
                break
        }
    }
    //console.log('rendering accountScreen')

    return (
        <div className={styleClasses['account-screen']}>
            <Panel className="form-panel">
                <h2>{screenTitle}</h2>
                <form className={styleClasses['account-form']} onSubmit={onSubmitAccount}>
                    <Input
                        inputProps={{
                            id: 'firstName',
                            name: 'firstName',
                            value: firstName,
                            onChange: handleInputChange

                        }}
                        labelText={t(labels.firstName) + ": "}
                    />
                    <Input
                        inputProps={{
                            id: 'lastName',
                            name: 'lastName',
                            value: lastName,
                            onChange: handleInputChange
                        }}
                        labelText={t(labels.lastName) + ": "}
                    />
                    <Select
                        selectProps={{
                            name: 'lang',
                            defaultValue: user.lang || '', 
                            ref: defaultLangRef
                        }}
                        labelText={t(labels.defaultLang) + ": "}
                        options={[
                            { value: "", label: `🌐 ${t(labels.defaultLang)}` },
                            { value: "en", label: '🇬🇧/🇺🇸 English' },
                            { value: "fr", label: '🇫🇷/🇧🇪 Français' },
                            { value: "es", label: '🇪🇸/🇲🇽 Español' }
                        ]}
                        disabledOption=""
                    />
                    <Select
                        selectProps={{
                            name: 'gender',
                            defaultValue: user.gender || '', 
                            ref: genderRef, 
                        }}
                        labelText={t(labels.gender) + ": "}
                        options={[
                            { value: "", label: `🚹 | 🚺 ${t(labels.gender)}` },
                            { value: "male", label: `🚹 ${t(labels.male)}` },
                            { value: "female", label: `🚺 ${t(labels.female)}` },
                            { value: "other", label: `❔ ${t(labels.otherGender)}` }
                        ]}
                        disabledOption=""
                    />
                    <FileInput
                        ref={avatarInputComponentRef}
                        id ='avatar'
                        labelText={t(labels.uploadAvatar) + ": "}
                        buttonText={t(labels.uploadAvatar)}
                        accept="image/*"
                    />
                    
                    <Input
                        inputProps={{
                            id: 'email',
                            name: 'email',
                            placeholder: t(labels.enterEmail),
                            type: 'email',
                            value: email,
                            onChange: handleInputChange
                        }}
                        labelText={t(labels.email) + ": "}
                    />
                    <Input
                        inputProps={{
                            id: 'password',
                            name: 'password',
                            placeholder: t(labels.enterPassword),
                            type: 'password',
                            value: password,
                            onChange: handleInputChange
                        }}
                        labelText={t(labels.password) + ": "}
                    />
                    <Input
                        inputProps={{
                            id: 'confirmPassword',
                            name: 'confirmPassword',
                            placeholder: t(labels.confirmPassword),
                            type: 'password',
                            value: confirmPassword,
                            onChange: handleInputChange
                        }}
                        labelText={t(labels.confirmPassword) + ": "}
                    />

                    <div className='button-container'>
                        {type === 'create'
                            ? <FormButton buttonProps={{ type: 'button', onClick: handleClearFields}} backgroundColor="red" color="white">{t(labels.reset)}</FormButton>
                            : <FormButton buttonProps={{ type: 'button', onClick: handleNavigateBack }} backgroundColor="red" color="white">{t(labels.cancel)}</FormButton>
                        }
                        <FormButton buttonProps={{ type: 'submit' }}>{type === 'create' ? t(labels.register) : t(labels.update)}</FormButton>
                    </div>
                    {type === 'create' && <p>{t(labels.haveAccountQuestion)} <Link to="/login">{t(labels.login)}</Link></p>}
                </form>
                <p className={styleClasses.error}>{statusMsg}&nbsp;</p>
            </Panel>
        </div>
    )
}
export default AccountScreen


