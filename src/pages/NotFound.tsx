import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">404</h1>
            <p className="text-xl text-muted-foreground">{t('notFound.description')}</p>
            <Link to="/">
                <Button variant="default">{t('common.actions.goHome')}</Button>
            </Link>
        </div>
    );
}

export default NotFound;
