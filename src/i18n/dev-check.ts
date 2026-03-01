import type { resources } from '@/i18n/resources';

type LocaleResources = typeof resources;
type TranslationNode = Record<string, unknown>;

const missingRuntimeKeys = new Set<string>();

const isObjectNode = (value: unknown): value is TranslationNode =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const flattenKeys = (node: TranslationNode, prefix = ''): string[] => {
  const keys: string[] = [];

  Object.entries(node).forEach(([key, value]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    if (isObjectNode(value)) {
      keys.push(...flattenKeys(value, next));
      return;
    }
    keys.push(next);
  });

  return keys;
};

export const reportLocaleKeyDiff = (
  allResources: LocaleResources,
  baselineLocale: keyof LocaleResources = 'en',
): void => {
  if (!import.meta.env.DEV) {
    return;
  }

  const baselineTranslation = allResources[baselineLocale]?.translation;
  if (!isObjectNode(baselineTranslation)) {
    return;
  }

  const baselineKeys = new Set(flattenKeys(baselineTranslation));

  Object.entries(allResources).forEach(([locale, bundle]) => {
    if (locale === baselineLocale) {
      return;
    }

    const targetTranslation = bundle?.translation;
    if (!isObjectNode(targetTranslation)) {
      return;
    }

    const targetKeys = new Set(flattenKeys(targetTranslation));
    const missingInTarget = [...baselineKeys].filter((key) => !targetKeys.has(key));
    const extraInTarget = [...targetKeys].filter((key) => !baselineKeys.has(key));

    if (missingInTarget.length > 0 || extraInTarget.length > 0) {
      console.warn(`[i18n] Locale key mismatch detected for "${locale}".`, {
        missingInTarget,
        extraInTarget,
      });
    }
  });
};

export const reportMissingRuntimeKey = (key: string): void => {
  if (!import.meta.env.DEV) {
    return;
  }
  if (missingRuntimeKeys.has(key)) {
    return;
  }

  missingRuntimeKeys.add(key);
  console.warn(`[i18n] Missing translation key: "${key}"`);
};
