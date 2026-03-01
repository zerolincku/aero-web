import { useTranslation } from 'react-i18next';

export default function Loading() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground">{t('loading.message')}</p>
            </div>
        </div>
    );
}
