import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '@/i18n/resources';

const LANGUAGE_STORAGE_KEY = 'app_language';
export const SUPPORTED_LANGUAGES = ['en', 'zh-CN'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const getInitialLanguage = (): SupportedLanguage => {
    if (typeof window === 'undefined') {
        return 'en';
    }

    const persisted = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (persisted && SUPPORTED_LANGUAGES.includes(persisted as SupportedLanguage)) {
        return persisted as SupportedLanguage;
    }

    const browserLanguage = window.navigator.language;
    if (browserLanguage.toLowerCase().startsWith('zh')) {
        return 'zh-CN';
    }

    return 'en';
};

void i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getInitialLanguage(),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

i18n.on('languageChanged', (language) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
});

export default i18n;
