import React from "react"
import { useStore } from "@/store/useStore.ts"
import { Toaster as Sonner } from "sonner"
import {
    CircleCheck,
    Info,
    Loader2,
    OctagonX,
    TriangleAlert,
} from "lucide-react"

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ ...props }: ToasterProps) {
    const theme = useStore((state) => state.theme)

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg bg-background border",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                    success: "group-[.toast]:bg-green-600 group-[.toast]:text-white group-[.toast]:border-green-600",
                    error: "group-[.toast]:bg-destructive group-[.toast]:text-destructive-foreground group-[.toast]:border-destructive",
                },
            }}
            icons={{
                success: <CircleCheck className="h-4 w-4 text-emerald-500" />,
                info: <Info className="h-4 w-4 text-blue-500" />,
                warning: <TriangleAlert className="h-4 w-4 text-amber-500" />,
                error: <OctagonX className="h-4 w-4 text-destructive" />,
                loading: <Loader2 className="h-4 w-4 animate-spin text-primary" />,
            }}
            {...props}
        />
    )
}

export { Toaster }
