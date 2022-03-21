import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import es from './es'
import fr from './fr'
import store from '../store'

const initLang = store.getState().lang ||'en'

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en
        }, 
        fr: {
            translation: fr
        }, 
        es: {
            translation: es
        }
    }, 
    lng: initLang, 
    fallbackLng: 'en', 
    interpolation: {
        escapeValue: false
    }
})

export default i18n