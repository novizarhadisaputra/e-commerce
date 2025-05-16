import i18n, { LanguageDetectorModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import { MMKVStorage } from '../storage/MMKVStorage';
import en from './locales/en.json';
import id from './locales/id.json';

const LANG_KEY = 'APP_LANG';

const languageDetector: LanguageDetectorModule = {
    type: 'languageDetector',
    init: () => { },
    detect: () => {
        const savedLang = MMKVStorage.getLanguage(LANG_KEY);
        const bestLang = RNLocalize.findBestLanguageTag(['en', 'id']);
        return savedLang || bestLang?.languageTag || 'en';
    },
    cacheUserLanguage: (lang: string) => {
        MMKVStorage.setLanguage(LANG_KEY, lang);
    },
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v4',
        fallbackLng: 'id',
        resources: {
            en: { translation: en },
            id: { translation: id },
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
