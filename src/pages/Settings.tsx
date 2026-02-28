import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useStore } from '../store/useStore';
import { LogOut, Save, User as UserIcon, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const ROLE_LABEL_KEY: Record<string, string> = {
    Admin: 'common.role.admin',
    Editor: 'common.role.editor',
    Viewer: 'common.role.viewer',
    Administrator: 'common.role.administrator',
};

export default function Settings() {
    const { currentUser, updateUser, logout, addToast } = useStore();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [name, setName] = useState(currentUser?.name ?? '');
    const [email, setEmail] = useState(currentUser?.email ?? '');

    const handleSave = () => {
        updateUser({ name, email });
        addToast({
            title: t('settings.toast.profileUpdatedTitle'),
            description: t('settings.toast.profileUpdatedDescription'),
            variant: 'success',
        });
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        addToast({
            title: t('settings.toast.logoutTitle'),
            description: t('settings.toast.logoutDescription'),
        });
    };

    const handleLanguageChange = (language: 'en' | 'zh-CN') => {
        void i18n.changeLanguage(language);
        const localizedT = i18n.getFixedT(language);
        addToast({
            title: localizedT('settings.preferences.toastTitle'),
            description: localizedT('settings.preferences.toastDescription'),
            variant: 'success',
        });
    };

    const languageValue = i18n.resolvedLanguage === 'zh-CN' ? 'zh-CN' : 'en';

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{t('settings.title')}</h2>
                <p className="text-muted-foreground">{t('settings.subtitle')}</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserIcon className="h-5 w-5" /> {t('settings.profile.title')}
                        </CardTitle>
                        <CardDescription>{t('settings.profile.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('settings.profile.displayName')}</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('settings.profile.email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{t('settings.profile.role')}</Label>
                                <Input
                                    disabled
                                    value={currentUser?.role ? t(ROLE_LABEL_KEY[currentUser.role] ?? currentUser.role) : ''}
                                    className="bg-muted text-muted-foreground"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{t('settings.profile.id')}</Label>
                                <Input disabled value={currentUser?.id || ''} className="bg-muted text-muted-foreground" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                        <p className="text-sm text-muted-foreground">
                            {t('settings.profile.lastUpdated', { time: t('settings.profile.justNow') })}
                        </p>
                        <Button onClick={handleSave}>
                            <Save className="mr-2 h-4 w-4" /> {t('common.actions.saveChanges')}
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Languages className="h-5 w-5" /> {t('settings.preferences.title')}
                        </CardTitle>
                        <CardDescription>{t('settings.preferences.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 max-w-xs">
                            <Label>{t('settings.preferences.language')}</Label>
                            <Select value={languageValue} onValueChange={(value) => handleLanguageChange(value as 'en' | 'zh-CN')}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">{t('common.language.english')}</SelectItem>
                                    <SelectItem value="zh-CN">{t('common.language.chineseSimplified')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-destructive/20">
                    <CardHeader>
                        <CardTitle className="text-destructive">{t('settings.danger.title')}</CardTitle>
                        <CardDescription>{t('settings.danger.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {t('settings.danger.body')}
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="destructive" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" /> {t('common.actions.logOut')}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
