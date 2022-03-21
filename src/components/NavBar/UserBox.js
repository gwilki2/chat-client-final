import styleClasses from './UserBox.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/pro-duotone-svg-icons'
import { logOut } from '../../store/auth/authActions'
import { useTranslation } from 'react-i18next'
import labels from '../../locale/labels'

const UserBox = () => {

    const dispatch = useDispatch()
    const { t } = useTranslation()
    const user = useSelector(state => state.auth.user)


    const handleLogOut = e => {
        e.preventDefault()
        dispatch(logOut())
    }

    return (
        <div className={styleClasses['user-box']}>
            <p>{user.firstName} {user.lastName[0]}.</p>
            <div className={styleClasses.avatar}>
                <img className={styleClasses.avatarImg} src={user.avatar} alt="avatar" />
            </div>
            <div className={styleClasses.dropdown}>
                <FontAwesomeIcon icon={faAngleDown} className={styleClasses['open-dropdown-icon']} />
                <div className={styleClasses['dropdown-items']}>
                    <div className={styleClasses['dropdown-item']}><Link to="/">{t(labels.chatScreen)}</Link></div>
                    <div className={styleClasses['dropdown-item']}><Link to="edit_account">{t(labels.profile)}</Link></div>
                    <div className={styleClasses['dropdown-item']} onClick={handleLogOut}><Link to="#" >{t(labels.logout)}</Link></div>
                </div>
            </div>
        </div>
    )
}

export default UserBox
