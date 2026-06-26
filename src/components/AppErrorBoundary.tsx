import React from 'react';
import { toLocation } from '@/config/router';
import { type WithTranslation, withTranslation } from 'react-i18next';

type AppErrorBoundaryProps = WithTranslation & {
  children: React.ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  public constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Unhandled application error:', error, errorInfo);
  }

  public render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const { t } = this.props;

    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h1 className="text-xl font-semibold">{t('error.boundary.title', { defaultValue: 'Something went wrong' })}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('error.boundary.description', { defaultValue: 'An unexpected error occurred. You can refresh the page or go back to the home route.' })}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
              onClick={() => window.location.reload()}
            >
              {t('error.boundary.reload', { defaultValue: 'Reload' })}
            </button>
            <a
              className="rounded-md border px-3 py-2 text-sm font-medium"
              href={toLocation('/')}
            >
              {t('error.boundary.goHome', { defaultValue: 'Go Home' })}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(AppErrorBoundary);
