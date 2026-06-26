import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormComponentsDemo } from './components-demo/FormComponentsDemo';
import { DataDisplayDemo } from './components-demo/DataDisplayDemo';
import { FeedbackDemo } from './components-demo/FeedbackDemo';
import { NavigationDemo } from './components-demo/NavigationDemo';
import { AdvancedDemo } from './components-demo/AdvancedDemo';

export default function ComponentsPage() {
    const { t } = useTranslation();
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [smsEnabled, setSmsEnabled] = useState(false);
    const [fruitValue, setFruitValue] = useState<string>();

    const [roleValue, setRoleValue] = useState<string>("viewer");

    // Advanced components state
    const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);
    const [transferTargetKeys, setTransferTargetKeys] = useState<string[]>(['2', '4']);
    
    const treeData = [
        {
            id: "1",
            name: "src",
            type: "folder" as const,
            children: [
                {
                    id: "1-1",
                    name: "components",
                    type: "folder" as const,
                    children: [
                        { id: "1-1-1", name: "Button.tsx", type: "document" as const },
                        { id: "1-1-2", name: "Tree.tsx", type: "document" as const },
                    ]
                },
                { id: "1-2", name: "logo.png", type: "image" as const },
                { id: "1-3", name: "App.tsx", type: "document" as const },
            ]
        },
        {
            id: "2",
            name: "public",
            type: "folder" as const,
            children: [
                { id: "2-1", name: "favicon.ico", type: "image" as const },
                { id: "2-2", name: "index.html", type: "file" as const }
            ]
        },
        { id: "3", name: "package.json", type: "document" as const },
    ];

    const transferData = [
        { id: '1', label: 'Admin User' },
        { id: '2', label: 'Regular User' },
        { id: '3', label: 'Guest User' },
        { id: '4', label: 'Editor', disabled: true },
        { id: '5', label: 'Viewer' },
        { id: '6', label: 'Super Admin' },
        { id: '7', label: 'Tester' },
    ];

    const navItems = [
        { id: 'button', label: t('components.sections.button') },
        { id: 'input', label: t('components.sections.input') },
        { id: 'select', label: t('components.sections.select') },
        { id: 'multi-select', label: t('components.multiSelectExample.title') },
        { id: 'switch', label: t('components.switchExample.title') },
        { id: 'checkbox', label: t('components.checkboxExample.title') },
        { id: 'radio-group', label: t('components.radioGroupExample.title') },
        { id: 'slider', label: t('components.sliderExample.title') },
        { id: 'tabs', label: t('components.tabsExample.title') },
        { id: 'card', label: t('components.sections.card') },
        { id: 'stats', label: t('components.sections.stats') },
        { id: 'badge', label: t('components.badgeExample.title') },
        { id: 'avatar', label: t('components.sections.avatar') },
        { id: 'table', label: t('components.sections.table') },
        { id: 'pagination', label: t('components.paginationExample.title') },
        { id: 'date-picker', label: t('components.datePickerExample.title') },
        { id: 'time-picker', label: t('components.timePickerExample.title') },
        { id: 'accordion', label: t('components.accordionExample.title') },
        { id: 'alert', label: t('components.alertExample.title') },
        { id: 'dialog', label: t('components.dialogExample.title') },
        { id: 'sheet', label: t('components.sheetExample.title') },
        { id: 'toast', label: t('components.toastExample.title') },
        { id: 'tooltip', label: t('components.tooltipExample.title') },
        { id: 'hover-card', label: t('components.hoverCardExample.title') },
        { id: 'progress', label: t('components.progressExample.title') },
        { id: 'skeleton', label: t('components.skeletonExample.title') },
        { id: 'scroll-area', label: t('components.scrollAreaExample.title') },
        { id: 'navigation-menu', label: t('components.navigationMenuExample.title') },
        { id: 'file-upload', label: t('components.fileUploadExample.title') },
        { id: 'image-upload', label: t('components.imageUploadExample.title') },
        { id: 'tree', label: t('components.treeExample.title') },
        { id: 'transfer', label: t('components.transferExample.title') },
        { id: 'action-form', label: t('components.sections.actionForm') },
        { id: 'empty-state', label: t('components.sections.emptyState') },
        { id: 'settings', label: t('components.sections.settings') },
        { id: 'list-item', label: t('components.sections.listItem') },
        { id: 'action-menu', label: t('components.sections.actionMenu') },
    ];

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex h-full flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 border-r shrink-0">
                <div className="sticky top-0 h-full p-4 overflow-y-auto">
                    <h4 className="mb-4 text-sm font-semibold tracking-tight uppercase text-muted-foreground">
                        {t('components.title')}
                    </h4>
                    <nav className="flex flex-col space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className="inline-flex items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-accent-foreground h-9 px-4 py-2 w-full text-left"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 pt-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {t('components.title')}
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        {t('components.subtitle')}
                    </p>
                </div>

                <div className="space-y-12 pb-20 max-w-4xl">
                    <FormComponentsDemo 
                        t={t}
                        fruitValue={fruitValue} 
                        setFruitValue={setFruitValue}
                        multiSelectValues={multiSelectValues}
                        setMultiSelectValues={setMultiSelectValues}
                        transferTargetKeys={transferTargetKeys}
                        setTransferTargetKeys={setTransferTargetKeys}
                        transferData={transferData}
                    />
                    <DataDisplayDemo 
                        t={t}
                        treeData={treeData}
                    />
                    <FeedbackDemo 
                        t={t}
                    />
                    <NavigationDemo 
                        t={t}
                    />
                    <AdvancedDemo 
                        t={t}
                        roleValue={roleValue}
                        setRoleValue={setRoleValue}
                        emailEnabled={emailEnabled}
                        setEmailEnabled={setEmailEnabled}
                        smsEnabled={smsEnabled}
                        setSmsEnabled={setSmsEnabled}
                    />
                </div>
            </main>
        </div>
    );
}
