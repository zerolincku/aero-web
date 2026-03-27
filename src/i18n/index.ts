import i18n, { type Callback } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { reportLocaleKeyDiff, reportMissingRuntimeKey } from '@/i18n/dev-check';

const LANGUAGE_STORAGE_KEY = 'app_language';
export const SUPPORTED_LANGUAGES = ['en', 'zh-CN'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
type LocaleBundle = {
    translation: Record<string, unknown>;
};
type LocaleResourceMap = Partial<Record<SupportedLanguage, LocaleBundle>>;

const localeLoaders: Record<SupportedLanguage, () => Promise<LocaleBundle>> = {
    en: async () => {
        const module = await import('@/i18n/locales/en');
        return module.en;
    },
    'zh-CN': async () => {
        const module = await import('@/i18n/locales/zh-CN');
        return module.zhCN;
    },
};
const loadedLocales = new Set<SupportedLanguage>();

const getInitialLanguage = (): SupportedLanguage => {
    if (import.meta.env.MODE === 'test') {
        return 'en';
    }
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

const isSupportedLanguage = (value: string): value is SupportedLanguage =>
    (SUPPORTED_LANGUAGES as readonly string[]).includes(value);

const preloadLocaleResources = async (languages: SupportedLanguage[]): Promise<LocaleResourceMap> => {
    const entries = await Promise.all(
        languages.map(async (language) => [language, await localeLoaders[language]()] as const),
    );
    entries.forEach(([language]) => loadedLocales.add(language));
    return Object.fromEntries(entries) as LocaleResourceMap;
};

const ensureLanguageLoaded = async (language: SupportedLanguage): Promise<void> => {
    if (loadedLocales.has(language) || i18n.hasResourceBundle(language, 'translation')) {
        loadedLocales.add(language);
        return;
    }
    const bundle = await localeLoaders[language]();
    i18n.addResourceBundle(language, 'translation', bundle.translation, true, true);
    loadedLocales.add(language);
};

const initialLanguage = getInitialLanguage();
const preloadedResources = await preloadLocaleResources(
    [...new Set<SupportedLanguage>([initialLanguage, 'en'])],
);

await i18n
    .use(initReactI18next)
    .init({
        resources: preloadedResources,
        lng: initialLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        parseMissingKeyHandler: (key) => {
            reportMissingRuntimeKey(key);
            return key;
        },
    });

const baseChangeLanguage = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = async (language?: string, callback?: Callback) => {
    if (language && isSupportedLanguage(language)) {
        await ensureLanguageLoaded(language);
    }
    return baseChangeLanguage(language, callback);
};

if (import.meta.env.DEV) {
    void (async () => {
        const module = await import('@/i18n/resources');
        reportLocaleKeyDiff(module.resources);
    })();
}

i18n.on('languageChanged', (language) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
});

export default i18n;
