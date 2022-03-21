import styleClasses from './NavBar.module.scss'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSquareList, faArrowRightToBracket, faClouds} from '@fortawesome/pro-duotone-svg-icons'
import LangSelector from './LangSelector'
import { useTranslation } from 'react-i18next'
import labels from '../../locale/labels'
import { useSelector } from 'react-redux'
import { Fragment } from 'react'
import UserBox from './UserBox'

const NavBar = () => {

    const { t } = useTranslation()
    
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    return (
        <div className={styleClasses['nav-bar']}>
            <Link to="/" className={styleClasses['logo-content']}>
                <h1><FontAwesomeIcon icon={faClouds} /> CloudyChat</h1>
            </Link>
            <div className={styleClasses['link-content']}>
                <div className={styleClasses['nav-link-group']}>
                    {!isLoggedIn
                        ? <Fragment>
                            <NavLink to="/login" className={navData => `${navData.isActive ? styleClasses['screen-active-link'] : null} ${styleClasses['nav-link']}`}>
                                <div className={styleClasses['link-effects']}>
                                    <FontAwesomeIcon icon={faArrowRightToBracket} /> {t(labels.login)}
                                </div>
                            </NavLink>
                            <NavLink to="/register" className={navData => `${navData.isActive ? styleClasses['screen-active-link'] : null} ${styleClasses['nav-link']}`}>
                                <div className={styleClasses['link-effects']}>
                                    <FontAwesomeIcon icon={faSquareList} /> {t(labels.register)}
                                </div>
                            </NavLink>
                        </Fragment>
                        : <Fragment>
                            <UserBox />
                        </Fragment>
                    }
                    
                    <LangSelector />
                </div>
            </div>
        </div>
    )
}

export default NavBar
