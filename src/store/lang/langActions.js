import langSlice from './langSlice'
import i18n from '../../locale/i18n'

const { languageChanged } = langSlice.actions

export const changeLanguage = (lang) => async dispatch => {
    localStorage.setItem('last-lang', lang)
    i18n.changeLanguage(lang)
    dispatch(languageChanged(lang))
}