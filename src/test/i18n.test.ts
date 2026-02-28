import i18n from '@/i18n';

describe('i18n', () => {
  it('switches language between en and zh-CN', async () => {
    await i18n.changeLanguage('zh-CN');
    expect(i18n.t('nav.dashboard')).toBe('仪表盘');

    await i18n.changeLanguage('en');
    expect(i18n.t('nav.dashboard')).toBe('Dashboard');
  });
});

