import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

export function CodeBlock({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);
    
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative rounded-md bg-muted">
            <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={copyToClipboard}
            >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
            <pre className="overflow-x-auto p-4 text-sm">
                <code>{code}</code>
            </pre>
        </div>
    );
}

export interface ComponentShowcaseProps {
    title: string;
    description: string;
    id: string;
    preview: React.ReactNode;
    code: string;
    t: (key: string) => string;
}

export function ComponentShowcase({ title, description, id, preview, code, t }: ComponentShowcaseProps) {
    const [view, setView] = useState<'preview' | 'code'>('preview');

    return (
        <section id={id} className="scroll-mt-20">
            <div className="mb-4">
                <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
                <p className="text-muted-foreground mt-1">{description}</p>
            </div>
            
            <div className="border rounded-lg">
                <div className="flex items-center border-b px-4 py-2 bg-muted/50 gap-4 rounded-t-lg">
                    <button 
                        onClick={() => setView('preview')}
                        className={`text-sm font-medium transition-colors hover:text-primary ${view === 'preview' ? 'text-primary border-b-2 border-primary -mb-[9px] pb-2' : 'text-muted-foreground'}`}
                    >
                        {t('components.labels.preview')}
                    </button>
                    <button 
                        onClick={() => setView('code')}
                        className={`text-sm font-medium transition-colors hover:text-primary ${view === 'code' ? 'text-primary border-b-2 border-primary -mb-[9px] pb-2' : 'text-muted-foreground'}`}
                    >
                        {t('components.labels.code')}
                    </button>
                </div>
                <div className="p-6 bg-background rounded-b-lg">
                    {view === 'preview' ? preview : <CodeBlock code={code} />}
                </div>
            </div>
        </section>
    );
}



