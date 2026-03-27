import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { useShallow } from 'zustand/react/shallow';
import { THEME_PRIMARY_HSL } from '@/theme/palette';

export default function ThemeController() {
    const { theme, themeColor } = useStore(
        useShallow((store) => ({
            theme: store.theme,
            themeColor: store.themeColor,
        })),
    );

    // Handle Light/Dark/System Mode
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
    }, [theme]);

    // Handle Theme Colors
    useEffect(() => {
        const root = window.document.documentElement;

        if (themeColor === 'zinc') {
            // Reset to default stylesheet values (handles dark/light zinc swap automatically)
            root.style.removeProperty('--primary');
            root.style.removeProperty('--primary-foreground');
            root.style.removeProperty('--ring');
        } else {
            // Enforce specific color for primary elements
            root.style.setProperty('--primary', THEME_PRIMARY_HSL[themeColor]);
            root.style.setProperty('--primary-foreground', '0 0% 100%'); // White text for colored buttons
            root.style.setProperty('--ring', THEME_PRIMARY_HSL[themeColor]);
        }
    }, [themeColor]);

    return null;
}
