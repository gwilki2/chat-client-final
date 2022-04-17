import { Link, useNavigate } from 'react-router-dom'
import FormButton from '../UI/FormButton'
import Input from '../UI/Input'
import Panel from '../UI/Panel'
import styleClasses from './index.module.scss'
import { useTranslation } from 'react-i18next'
import labels from '../../locale/labels'
import { useTitleBar } from '../../hooks/useTitleBar'
import loginIcon from '../../assets/person-to-portal-duotone.svg'
import { useDispatch } from 'react-redux'
import { logIn } from '../../store/auth/authActions'
import { useState } from 'react'
import { fnNames } from '../../validators'
import useMyValidation from '../../hooks/useMyValidation'

const LoginScreen = ({ type }) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [errorMsg, setErrorMsg] = useState('')
    const email = useMyValidation({
        name: 'email',
        initVal: '',
        validationFns: [
            { name: fnNames.isEmail, params: [] },
            { name: fnNames.isNotEmpty, params: [] }
        ],
        specialFormattingFn: val => val.trim()
    })
    const password = useMyValidation({
        name: 'password',
        initVal: '',
        validationFns: [
            { name: fnNames.isNotEmpty, params: [] },
            { name: fnNames.hasMinChars, params: [6] }
        ]
    })

    useTitleBar(t(labels.login), loginIcon)

    const onLogin = async e => {
        e.preventDefault()
        console.log(e.target.email.value, e.target.password.value)

        try {
            
            await dispatch(logIn(email.value.trim(), password.value.trim(), navigate))
            setErrorMsg('')
        } catch (e) {
            console.log('in login catch')
            setErrorMsg(t(e.response.data.error))
        }

    }
    ////////////////////Reminder:  On login get default language from user and change language to default
    console.log(email.value, password.value)
    return (
        <div className={styleClasses['login-screen']}>
            <Panel className="form-panel">
                <h2>{t(labels.login)}</h2>
                <form className={styleClasses['login-form']} onSubmit={onLogin}>
                    <Input
                        inputProps={{
                            id: 'email',
                            placeholder: t(labels.enterEmail),
                            type: 'email',
                            name: 'email',
                            onChange: e => email.onChange(e.target.value),
                            onBlur: e => email.onBlur(e.target.value),
                            value: email.value
                        }}
                        labelText={t(labels.email) + ": "}
                        hasError={email.hasErrorAfterTouch}
                    />

                    {email.hasErrorAfterTouch && email.errors.map(error => <p style={{color:'red'}} key={error}>{t(error + 'Failed')}</p>)}
                    <Input
                        inputProps={{
                            id: 'password',
                            placeholder: t(labels.enterPassword), 
                            type: 'password', 
                            name: password.name, 
                            onChange: e => password.onChange(e.target.value),
                            onBlur: e => password.onBlur(e.target.value),
                            value: password.value 
                        }}
                        labelText={t(labels.password) + ": "}
                        hasError={password.hasErrorAfterTouch}
                    />
                    {password.hasErrorAfterTouch && password.errors.map(error => <p style={{color:'red'}} key={error}>{t(error + 'PasswordFailed')}</p>)}

                    <div className='button-container'>
                        <FormButton
                            buttonProps={{
                                disabled: !email.isValid || !password.isValid
                            }}
                        >{t(labels.login)}</FormButton>
                    </div>
                    <p className={styleClasses['error-msg-p']}>{errorMsg}&nbsp;</p>
                    <p>{t(labels.noAccountQuestion)} <Link to="/register">{t(labels.register)}</Link></p>
                </form>
            </Panel>
        </div>
    )
}

export default LoginScreen
