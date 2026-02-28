import '@testing-library/jest-dom';
import i18n from '@/i18n';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

beforeEach(async () => {
  localStorage.clear();
  await i18n.changeLanguage('en');
});

