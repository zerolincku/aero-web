import React from 'react';
import { toLocation } from '@/config/router';
import { Button } from '@/components/ui/button';
import { type WithTranslation, withTranslation } from 'react-i18next';

type AppErrorBoundaryProps = WithTranslation & {
  children: React.ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends React.Component<
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

  private handleGoHome = (): void => {
    const target = toLocation('/');

    if (target.startsWith('#')) {
      window.location.hash = target;
    } else {
      window.history.pushState(null, '', target);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }

    this.setState({ hasError: false });
  };

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
            <Button
              type="button"
              onClick={() => window.location.reload()}
            >
              {t('error.boundary.reload', { defaultValue: 'Reload' })}
            </Button>
            <Button type="button" variant="outline" onClick={this.handleGoHome}>
              {t('error.boundary.goHome', { defaultValue: 'Go Home' })}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withTranslation()(AppErrorBoundary);
