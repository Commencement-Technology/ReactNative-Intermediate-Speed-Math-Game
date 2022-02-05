import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './locale/en';
import hn from './locale/hn';
import mar from './locale/mar';

const LANGUAGES = {
  en,
  hn,
  mar,
};

const LANG_CODES = Object.keys(LANGUAGES);

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('user-language', (err, language) => {
      // if error fetching stored data or no language was stored
      // display errors when in DEV mode as console statements
      if (err || !language) {
        if (err) {
          //"Error fetching Languages from asyncstorage "
        } else {
          //No language is set, choosing English as fallback
        }
        const findBestAvailableLanguage =
          RNLocalize.findBestAvailableLanguage(LANG_CODES);

        callback(
          (findBestAvailableLanguage &&
            findBestAvailableLanguage.languageTag) ||
            'en',
        );
        return;
      }
      callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: (language: any) => {
    AsyncStorage.setItem('user-language', language);
  },
};

i18n
  // detect language
  .use(LANGUAGE_DETECTOR)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // set options
  .init({
    resources: LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
