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
import { useEffect, useRef, useState } from 'react'
import { register, updateUser } from '../../store/auth/authActions'
import FileInput from '../UI/FileInput' 
import { fnNames } from '../../validators'
import useMyValidation from '../../hooks/useMyValidation'

const AccountScreen = ({ type = 'create' }) => {

    const { t } = useTranslation()
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const email = useMyValidation(
        'email',
        user.email || '',
        [
            { name: fnNames.isEmail, params: [] },
            { name: fnNames.isNotEmpty, params: [] }
        ],
        val => val.trim()
    )
    const password = useMyValidation(
        'password',
        '',
        [
            {name: type==='create' ? fnNames.hasMinChars : fnNames.minCharsWhenFilled, params: [6]}
        ]
    )
    const firstName = useMyValidation(
        'firstName',
        user.firstName || '',
        [
            {name: fnNames.isNotEmpty, params: []}
        ]
    )
    const lastName = useMyValidation(
        'lastName',
        user.lastName || '',
        [
            {name: fnNames.isNotEmpty, params: []}
        ]
    )
    const confirmPassword = useMyValidation(
        'confirmPassword',
        '',
        [
            {name: type==='create' ? fnNames.hasMinChars : fnNames.minCharsWhenFilled, params: [6]}
        ]
    )

    const [isReadOnly, setIsReadOnly] = useState(true)

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
        firstName.reset()
        lastName.reset()
        defaultLangRef.current.value = ''
        avatarInputComponentRef.current.removeAllFiles()
        genderRef.current.value = ''
        email.reset()
        confirmPassword.reset()
        password.reset()
        
    }

    const onSubmitAccount = e => {
        e.preventDefault()

        if (password.value !== confirmPassword.value) return flashError(t(labels.failedPasswordConfirm))
        if (!defaultLangRef.current.value) return flashError(t(labels.defaultLangIsRequired))
        if (!genderRef.current.value) return flashError(t(labels.genderIsRequired))
        const {files} = avatarInputComponentRef.current
        //const formData = new FormData(e.target) //nolonger using multer on server, send regular data
        const formData = {
            firstName: firstName.value,
            lastName: lastName.value, 
            lang: defaultLangRef.current.value, 
            gender: genderRef.current.value,
            avatar: files[0]?.name ||'',
            email: email.value, 
            password: password.value, 
            confirmPassword: confirmPassword.value
        }
        console.log(formData, files)
        
        type === 'create' ? dispatch(register(formData, navigate, setStatusMsg, files[0])) : dispatch(updateUser(formData, setStatusMsg, files[0]))
        avatarInputComponentRef.current.removeAllFiles()
        password.reset()
        confirmPassword.reset()

    }
    

    useEffect(() => {
        //autofill is overwriting initial values blank or preset forcing a rewrite of initial values
        //setFirstName('test1234')

        setTimeout(() => {
            setIsReadOnly(false)
        }, 1000)
        
    }, [])

    return (
        <div className={styleClasses['account-screen']}>
            <Panel className="form-panel">
                <h2>{screenTitle}</h2>
                <form
                    className={styleClasses['account-form']}
                    onSubmit={onSubmitAccount}
                    autoComplete={type==='create'? 'on':'off' }
                >
                    <Input
                        inputProps={{
                            id: 'firstName',
                            name: 'firstName',
                            value: firstName.value,
                            onChange: e => firstName.onChange(e.target.value),
                            onBlur: e => firstName.onBlur(e.target.value)

                        }}
                        indicateRequired={true}
                        labelText={t(labels.firstName) + ": "}
                    />
                    {firstName.hasErrorAfterTouch && firstName.errors.map(error => <p style={{color:'red'}} key={error}>{t(error + 'Failed')}</p>)}

                    <Input
                        inputProps={{
                            id: 'lastName',
                            name: 'lastName',
                            value: lastName.value,
                            onChange: e => lastName.onChange(e.target.value),
                            onBlur: e => lastName.onBlur(e.target.value)
                        }}
                        indicateRequired={true}
                        labelText={t(labels.lastName) + ": "}
                    />
                    {lastName.hasErrorAfterTouch && lastName.errors.map(error => <p style={{color:'red'}} key={error}>{t(error + 'Failed')}</p>)}
                    
                    <Select
                        selectProps={{
                            name: 'lang',
                            defaultValue: user.lang || '', 
                            ref: defaultLangRef, 
                        }}
                        labelText={t(labels.defaultLang) + ": "}
                        options={[
                            { value: "", label: `🌐 ${t(labels.defaultLang)}` },
                            { value: "en", label: '🇬🇧/🇺🇸 English' },
                            { value: "fr", label: '🇫🇷/🇧🇪 Français' },
                            { value: "es", label: '🇪🇸/🇲🇽 Español' }
                        ]}
                        disabledOption=""
                        indicateRequired={true}
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
                        indicateRequired={true}
                    />
                    
                    <FileInput
                        ref={avatarInputComponentRef}
                        id='avatar' 
                        labelText={t(labels.uploadAvatar) + ": "}
                        buttonText={t(labels.uploadAvatar)}
                        accept="image/*"
                    />
                    
                    <Input
                        inputProps={{
                            id: 'email',
                            name: 'email',
                            placeholder: t(labels.enterEmail),
                            type: 'text',
                            onChange: e => email.onChange(e.target.value),
                            onBlur: e => email.onBlur(e.target.value),
                            value: email.value,
                            autoComplete: 'off', 
                            readOnly: isReadOnly
                            
                        }}
                        indicateRequired={true}
                        labelText={t(labels.email) + ": "}
                        hasError={email.hasErrorAfterTouch}
                    />
                    {email.hasErrorAfterTouch && email.errors.map(error => <p style={{color:'red'}} key={error}>{t(error + 'Failed')}</p>)}
                    
                    <Input
                        inputProps={{
                            id: 'password',
                            name: 'password',
                            placeholder: t(labels.enterPassword),
                            type: 'password',
                            onChange: e => password.onChange(e.target.value),
                            onBlur: e => password.onBlur(e.target.value),
                            value: password.value, 
                            autoComplete: 'off', 
                            readOnly: isReadOnly,

                        }}
                        indicateRequired={type==='create'}
                        labelText={t(labels.password) + ": "}
                        hasError={password.hasErrorAfterTouch}
                    />
                    {password.hasErrorAfterTouch && password.errors.map(error => <p style={{color:'red'}} key={error}>{t(error + 'PasswordFailed')}</p>)}
                    
                    <Input
                        inputProps={{
                            id: 'confirmPassword',
                            name: 'confirmPassword',
                            placeholder: t(labels.confirmPassword),
                            type: 'password',
                            value: confirmPassword.value,
                            onChange: e => confirmPassword.onChange(e.target.value),
                            onBlur: e => confirmPassword.onBlur(e.target.value),
                            autoComplete: 'off', 
                            readOnly: isReadOnly
                        }}
                        indicateRequired={type==='create'}
                        labelText={t(labels.confirmPassword) + ": "}
                    />
                    {confirmPassword.hasErrorAfterTouch && confirmPassword.errors.map(error => <p style={{color:'red'}} key={error}>{t(error + 'PasswordFailed')}</p>)}

                    <div>
                        <div className='button-container'>
                            {type === 'create'
                                ? <FormButton buttonProps={{ type: 'button', onClick: handleClearFields}} backgroundColor="red" color="white">{t(labels.reset)}</FormButton>
                                : <FormButton buttonProps={{ type: 'button', onClick: handleNavigateBack }} backgroundColor="red" color="white">{t(labels.cancel)}</FormButton>
                            }
                            <FormButton
                                buttonProps={{
                                    type: 'submit', 
                                    disabled:
                                        !email.isValid ||
                                        !password.isValid ||
                                        !confirmPassword.isValid ||
                                        !firstName.isValid ||
                                        !lastName.isValid
                                }}
                            >{type === 'create' ? t(labels.register) : t(labels.update)}</FormButton>
                        </div>
                        <p>An asterisk (<span style={{color:'red'}}>*</span>) indicates a required field.</p>
                    </div>
                    {type === 'create' && <p>{t(labels.haveAccountQuestion)} <Link to="/login">{t(labels.login)}</Link></p>}
                </form>
                <p className={styleClasses.error}>{statusMsg}&nbsp;</p>
            </Panel>
        </div>
    )
}
export default AccountScreen


