import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//import i18nextReactNative from 'i18next-react-native-language-detector';



//import LanguageDetector from 'i18next-browser-languagedetector';
import common_en from '../locales/en/common_en.json'
import common_tam from '../locales/tam/common_tam.json'



// not like to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init
//Platform.OS === 'android' ? I18nManager.forceRTL(false) : null


i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  //.use(Backend)
  .use(initReactI18next)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //.use(LanguageDetector)
  // pass the i18n instance to react-i18next.

  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {
        Common: common_en,
      },
      tam: {
        Common: common_tam,
      },
    },
    fallbackLng: 'en',
    ns: [
      
      'Common'
    ],
    defaultNS: 'common',
    fallbackNS: ['common'],
    debug: process.env.NODE_ENV !== 'production',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    react: {
      useSuspense: false,
      wait: false
    }
  });


export default i18n;