import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface TimePickerProps {
    value?: string;
    onChange?: (v: string) => void;
    className?: string;
    disabled?: boolean;
    error?: boolean;
}

export function TimePicker({ value, onChange, className, disabled, error }: TimePickerProps) {
    const { t } = useTranslation();
    const [internalHours, setInternalHours] = useState('12');
    const [internalMinutes, setInternalMinutes] = useState('00');

    const hours = value ? value.split(':')[0] : internalHours;
    const minutes = value ? value.split(':')[1] : internalMinutes;

    const handleHoursChange = (v: string) => {
        setInternalHours(v);
        onChange?.(`${v}:${minutes}`);
    };

    const handleMinutesChange = (v: string) => {
        setInternalMinutes(v);
        onChange?.(`${hours}:${v}`);
    };

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Select value={hours} onValueChange={handleHoursChange}>
                <SelectTrigger disabled={disabled} aria-label={t('common.timePicker.hour', 'HH')} className={cn("min-w-[70px] flex-1", error && "border-destructive ring-1 ring-destructive hover:bg-transparent")}>
                    <SelectValue placeholder={t('common.timePicker.hour', 'HH')} />
                </SelectTrigger>
                <SelectContent side="top" className="max-h-[200px] overflow-y-auto">
                    {Array.from({ length: 24 }).map((_, i) => {
                        const val = i.toString().padStart(2, '0');
                        return <SelectItem key={val} value={val}>{val}</SelectItem>;
                    })}
                </SelectContent>
            </Select>
            <span className="text-muted-foreground">:</span>
            <Select value={minutes} onValueChange={handleMinutesChange}>
                <SelectTrigger disabled={disabled} aria-label={t('common.timePicker.minute', 'MM')} className={cn("min-w-[70px] flex-1", error && "border-destructive ring-1 ring-destructive hover:bg-transparent")}>
                    <SelectValue placeholder={t('common.timePicker.minute', 'MM')} />
                </SelectTrigger>
                <SelectContent side="top" className="max-h-[200px] overflow-y-auto">
                    {Array.from({ length: 60 }).map((_, i) => {
                        const val = i.toString().padStart(2, '0');
                        return <SelectItem key={val} value={val}>{val}</SelectItem>;
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}
