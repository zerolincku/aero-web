import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Login() {
    const navigate = useNavigate();
    const { login, addToast } = useStore();
    const { t } = useTranslation();
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('password');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API delay
        setTimeout(() => {
            if (email && password) {
                login(email);
                addToast({
                    title: t('login.successTitle'),
                    description: t('login.successDescription'),
                    variant: "success"
                });
                navigate('/');
            } else {
                addToast({
                    title: t('login.errorTitle'),
                    description: t('login.errorDescription'),
                    variant: "destructive"
                });
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/20 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                            <Lock className="h-6 w-6 text-primary-foreground" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">{t('login.title')}</CardTitle>
                    <CardDescription className="text-center">
                        {t('login.description')}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">{t('login.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={t('login.emailPlaceholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{t('login.password')}</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? t('common.actions.signingIn') : t('common.actions.signIn')}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
