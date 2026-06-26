import { resources } from '@/i18n/resources';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

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

function getAllSourceFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = readdirSync(dirPath);

  files.forEach((file: string) => {
    const fullPath = join(dirPath, file);
    if (statSync(fullPath).isDirectory()) {
      if (!['node_modules', 'test', 'i18n'].includes(file)) {
        arrayOfFiles = getAllSourceFiles(fullPath, arrayOfFiles);
      }
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

describe('i18n locale keys', () => {
  it('keeps en and zh-CN translation key sets in sync', () => {
    const enKeys = new Set(flattenKeys(resources.en.translation as TranslationTree));
    const zhKeys = new Set(flattenKeys(resources['zh-CN'].translation as TranslationTree));

    const missingInZh = [...enKeys].filter((key) => !zhKeys.has(key));
    const extraInZh = [...zhKeys].filter((key) => !enKeys.has(key));

    expect(missingInZh).toEqual([]);
    expect(extraInZh).toEqual([]);
  });

  it('ensures all keys referenced in code exist in locales', () => {
    const enKeys = new Set(flattenKeys(resources.en.translation as TranslationTree));
    const srcDir = resolve(__dirname, '../');
    const files = getAllSourceFiles(srcDir);

    // This regex matches `t('key')` or `t("key")` but ignores dynamic ones
    const keyRegex = /\bt\(\s*['"]([^'"]+)['"]/g;
    const missingKeys = new Set<string>();

    files.forEach((file) => {
      const content = readFileSync(file, 'utf-8');
      let match;
      while ((match = keyRegex.exec(content)) !== null) {
        const key = match[1];
        if (!enKeys.has(key)) {
          const relativePath = file.split('/src/')[1] || file;
          missingKeys.add(`${key} (in ${relativePath})`);
        }
      }
    });

    expect(Array.from(missingKeys)).toEqual([]);
  });
});
