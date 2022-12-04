import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import SETTING from './config/setting';
import Backend from 'i18next-http-backend';
import vn from './locales/vn.json';
import en from './locales/en.json';

const resources = {
    en: {
        translation: en
    },
    vn: {
        translation: vn
    }
};

i18n
	.use(Backend)
	// detect user language
	.use(LanguageDetector)
	// pass the i18n instance to react-i18n
	.use(initReactI18next)
	// setup init i18n
	.init({
		debug: true,
		fallbackLng: SETTING.I18N_DEFAULT_SETTING || 'vn',
		interpolation: {
			// no need for react as it escapes by default
			escapeValue: false,
		},
		detection: {
			order: [ 'cookie', 'htmlTag' ],
			caches: [ 'cookie' ],
		},
		resources,
	});
    
export default i18n;
    