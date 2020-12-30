import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nextReactNative from 'i18next-react-native-language-detector'


import common_en from '../locales/en/common_en.json'
import common_tam from '../locales/tam/common_tam.json'
import common_hin from '../locales/hin/common_hin.json'
import common_tel from '../locales/tel/common_tel.json'
import common_nepali from '../locales/nepali/common_nepali.json'
import common_marathi from '../locales/marathi/common_marathi.json'
import common_punjabi from '../locales/punjabi/common_punjabi.json'
import common_odia from '../locales/odia/common_odia.json'
import common_kannada from '../locales/kannada/common_kannada.json'
import common_gujarati from '../locales/gujarati/common_gujarati.json'
import common_bengali from '../locales/bengali/common_bengali.json'





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
  .use(i18nextReactNative)
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
      hin :{
        Common: common_hin,
      },
      tel :{
        Common: common_tel,
      },
      nepali: {
        Common: common_nepali,
      },
      marathi: {
        Common: common_marathi,
      },
      punjabi :{
        Common: common_punjabi,
      },
      odia :{
        Common: common_odia,
      },
      kannada: {
        Common: common_kannada,
      },
      gujarati: {
        Common: common_gujarati,
      },
      bengali :{
        Common: common_bengali,
      }
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
      useSuspense: true,
      wait: false
    }
  });


export default i18n;