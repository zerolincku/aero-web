import { resources } from '@/i18n/resources';

type TranslationTree = Record<string, unknown>;

const isObjectTree = (value: unknown): value is TranslationTree =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const flattenKeys = (tree: TranslationTree, prefix = ''): string[] => {
  const keys: string[] = [];

  Object.entries(tree).forEach(([key, value]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    if (isObjectTree(value)) {
      keys.push(...flattenKeys(value, next));
      return;
    }
    keys.push(next);
  });

  return keys;
};

describe('i18n locale keys', () => {
  it('keeps en and zh-CN translation key sets in sync', () => {
    const enKeys = new Set(flattenKeys(resources.en.translation as TranslationTree));
    const zhKeys = new Set(flattenKeys(resources['zh-CN'].translation as TranslationTree));

    const missingInZh = [...enKeys].filter((key) => !zhKeys.has(key));
    const extraInZh = [...zhKeys].filter((key) => !enKeys.has(key));

    expect(missingInZh).toEqual([]);
    expect(extraInZh).toEqual([]);
  });
});
