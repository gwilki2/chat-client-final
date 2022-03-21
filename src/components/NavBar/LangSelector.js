import styleClasses from './LangSelector.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { changeLanguage } from '../../store/lang/langActions'

const LangSelector = () => {

    const dispatch = useDispatch()
    const initLang = useSelector(state => state.lang)

    const handleLangChange = e => {
        dispatch(changeLanguage(e.target.value))
    }
    
    return (
        <select value={initLang} onChange={handleLangChange} className={styleClasses['lang-selector']}>
            <option value="" disabled>Language</option>
            <option value="en">🇬🇧/🇺🇸 English</option>
            <option value="fr">🇫🇷/🇧🇪 Français</option>
            <option value="es">🇪🇸/🇲🇽 Español</option>
        </select>
    )
}

export default LangSelector
