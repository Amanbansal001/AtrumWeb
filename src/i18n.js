import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as constants from './Utils/constants';

const languages = {
    "en": "en",
    "en-us": "en",
    "no": "no",
    "hi": "hi",
};

const translations = JSON.parse(localStorage.getItem(constants.LOCALSTORAGE.translations)) || null;

const browser_lang = navigator.language || navigator.userLanguage;

const get_lang = languages[browser_lang];

const user_lang = localStorage.getItem(constants.LOCALSTORAGE.lang) || get_lang || "en";


i18n
   
    .use(initReactI18next)
   
    .init({
        debug: true,

        lng: user_lang,
        fallbackLng: 'en',
        whitelist: ['en', 'fr', 'no'],

        interpolation: {
            escapeValue: false,
        },
        resources: translations,
        
    });

export default i18n;