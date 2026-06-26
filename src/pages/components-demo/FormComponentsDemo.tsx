import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TimePicker } from '@/components/ui/time-picker';
import { cn } from '@/lib/utils';
import {
    Clock} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

import { MultiSelect } from "@/components/ui/multi-select";
import { FileUpload } from "@/components/ui/file-upload";
import { ImageUpload } from "@/components/ui/image-upload";
import { Transfer } from "@/components/ui/transfer";





import { ComponentShowcase } from './ComponentShowcase';

export function FormComponentsDemo({ t, fruitValue, setFruitValue, multiSelectValues, setMultiSelectValues, transferTargetKeys, setTransferTargetKeys, transferData,  }: any) {
    return (
        <div className="space-y-12">
                    <ComponentShowcase 
                        id="button"
                        title={t('components.buttonExample.title')}
                        description={t('components.buttonExample.description')}
                        t={t}
                        preview={
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-3 items-center">
                                    <Button>{t('components.buttonExample.primary')}</Button>
                                    <Button variant="secondary">{t('components.buttonExample.secondary')}</Button>
                                    <Button variant="destructive">{t('components.buttonExample.destructive')}</Button>
                                    <Button variant="outline">{t('components.buttonExample.outline')}</Button>
                                    <Button variant="ghost">{t('components.buttonExample.ghost')}</Button>
                                    <Button variant="link">{t('components.buttonExample.link')}</Button>
                                </div>
                                <div className="flex flex-wrap gap-3 items-center">
                                    <Button size="sm">Small</Button>
                                    <Button size="default">Default</Button>
                                    <Button size="lg">Large</Button>
                                    <Button loading>Loading...</Button>
                                    <Button disabled>Disabled</Button>
                                </div>
                            </div>
                        }
                        code={`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>`}
                    />
                    <ComponentShowcase 
                        id="input"
                        title={t('components.inputExample.title')}
                        description={t('components.inputExample.description')}
                        t={t}
                        preview={
                            <div className="grid gap-6 md:grid-cols-2 max-w-xl">
                                <div className="space-y-2">
                                    <Label htmlFor="default-input">{t('components.inputExample.default')}</Label>
                                    <Input id="default-input" placeholder={t('components.inputExample.placeholder')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="disabled-input">{t('components.inputExample.disabled')}</Label>
                                    <Input id="disabled-input" disabled placeholder={t('components.inputExample.placeholder')} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="hint-input">{t('components.inputExample.withLabel')}</Label>
                                    <Input id="hint-input" placeholder="you@example.com" />
                                    <p className="text-[0.8rem] text-muted-foreground">Enter your email address.</p>
                                </div>
                            </div>
                        }
                        code={`import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Default
<Input placeholder="Type something..." />

// Disabled
<Input disabled placeholder="Type something..." />

// With Label and Hint
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="you@example.com" />
  <p className="text-[0.8rem] text-muted-foreground">Enter your email address.</p>
</div>`}
                    />
                    <ComponentShowcase 
                        id="select"
                        title={t('components.selectExample.title')}
                        description={t('components.selectExample.description')}
                        t={t}
                        preview={
                            <div className="max-w-xs">
                                <Select value={fruitValue} onValueChange={setFruitValue}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('components.selectExample.placeholder')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="apple">{t('components.selectExample.apple')}</SelectItem>
                                        <SelectItem value="banana">{t('components.selectExample.banana')}</SelectItem>
                                        <SelectItem value="orange">{t('components.selectExample.orange')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        }
                        code={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`}
                    />
                    <ComponentShowcase
                        id="multi-select"
                        title={t('components.multiSelectExample.title')}
                        description={t('components.multiSelectExample.description')}
                        t={t}
                        preview={
                            <div className="w-[320px] space-y-4">
                                <div className="space-y-1.5">
                                    <p className="text-sm text-muted-foreground">Basic</p>
                                    <MultiSelect
                                        options={[
                                            { label: "React", value: "react" },
                                            { label: "Vue", value: "vue" },
                                            { label: "Angular", value: "angular" },
                                            { label: "Svelte", value: "svelte" },
                                            { label: "Solid", value: "solid", disabled: true },
                                        ]}
                                        value={multiSelectValues}
                                        onChange={setMultiSelectValues}
                                        placeholder="Select frameworks..."
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-sm text-muted-foreground">Max 2 selections</p>
                                    <MultiSelect
                                        options={[
                                            { label: "React", value: "react" },
                                            { label: "Vue", value: "vue" },
                                            { label: "Angular", value: "angular" },
                                        ]}
                                        value={multiSelectValues.slice(0, 2)}
                                        onChange={(vals) => setMultiSelectValues(vals)}
                                        placeholder="Max 2 items..."
                                        maxCount={2}
                                        maxCountText="Only 2 items selected"
                                    />
                                </div>
                            </div>
                        }
                        code={`<MultiSelect
    options={[
        { label: "React", value: "react" },
        { label: "Vue", value: "vue" },
    ]}
    value={multiSelectValues}
    onChange={setMultiSelectValues}
    placeholder="Select frameworks..."
/>`}
                    />
                    <ComponentShowcase
                        id="switch"
                        title={t('components.switchExample.title')}
                        description={t('components.switchExample.description')}
                        t={t}
                        preview={
                            <div className="flex items-center space-x-2">
                                <Switch id="airplane-mode" />
                                <Label htmlFor="airplane-mode">Airplane Mode</Label>
                            </div>
                        }
                        code={`<div className="flex items-center space-x-2">
    <Switch id="airplane-mode" />
    <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`}
                    />
                    <ComponentShowcase
                        id="checkbox"
                        title={t('components.checkboxExample.title')}
                        description={t('components.checkboxExample.description')}
                        t={t}
                        preview={
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms">Accept terms and conditions</Label>
                            </div>
                        }
                        code={`<div className="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`}
                    />
                    <ComponentShowcase
                        id="radio-group"
                        title={t('components.radioGroupExample.title')}
                        description={t('components.radioGroupExample.description')}
                        t={t}
                        preview={
                            <RadioGroup defaultValue="comfortable">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="default" id="r1" />
                                    <Label htmlFor="r1">Default</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="comfortable" id="r2" />
                                    <Label htmlFor="r2">Comfortable</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="compact" id="r3" />
                                    <Label htmlFor="r3">Compact</Label>
                                </div>
                            </RadioGroup>
                        }
                        code={`<RadioGroup defaultValue="comfortable">
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
    </div>
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
    </div>
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
    </div>
</RadioGroup>`}
                    />
                    <ComponentShowcase
                        id="slider"
                        title={t('components.sliderExample.title')}
                        description={t('components.sliderExample.description')}
                        t={t}
                        preview={
                            <Slider
                                defaultValue={[50]}
                                max={100}
                                step={1}
                                className="w-[60%]"
                            />
                        }
                        code={`<Slider
    defaultValue={[50]}
    max={100}
    step={1}
    className="w-[60%]"
/>`}
                    />
                    <ComponentShowcase 
                        id="date-picker"
                        title={t('components.datePickerExample.title')}
                        description={t('components.datePickerExample.description')}
                        t={t}
                        preview={<DatePickerDemo />}
                        code={`const [date, setDate] = useState<Date>()

<Popover>
  <PopoverTrigger asChild>
    <Button
      variant={"outline"}
      className={cn(
        "w-[280px] justify-start text-left font-normal",
        !date && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : <span>Pick a date</span>}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
    />
  </PopoverContent>
</Popover>`}
                    />
                    <ComponentShowcase 
                        id="date-time-picker"
                        title={t('components.dateTimePickerExample.title')}
                        description={t('components.dateTimePickerExample.description')}
                        t={t}
                        preview={<DateTimePickerDemo />}
                        code={`const [date, setDate] = useState<Date>()

<Popover>
  <PopoverTrigger asChild>
    <Button
      variant={"outline"}
      className={cn(
        "w-[280px] justify-start text-left font-normal",
        !date && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : <span>Pick a date & time</span>}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
    />
    <div className="p-3 border-t border-border">
      <Input type="time" className="w-full" />
    </div>
  </PopoverContent>
</Popover>`}
                    />
                    <ComponentShowcase 
                        id="time-picker"
                        title={t('components.timePickerExample.title')}
                        description={t('components.timePickerExample.description')}
                        t={t}
                        preview={<TimePickerDemo />}
                        code={`<div className="flex items-center gap-2">
  <Input type="time" className="w-[150px]" defaultValue="12:00" />
</div>`}
                    />
                    <ComponentShowcase
                        id="file-upload"
                        title={t('components.fileUploadExample.title')}
                        description={t('components.fileUploadExample.description')}
                        t={t}
                        preview={
                            <div className="w-full max-w-md">
                                <FileUpload maxFiles={3} onChange={(files) => console.log(files)} />
                            </div>
                        }
                        code={`<FileUpload maxFiles={3} onChange={(files) => console.log(files)} />`}
                    />
                    <ComponentShowcase
                        id="image-upload"
                        title={t('components.imageUploadExample.title')}
                        description={t('components.imageUploadExample.description')}
                        t={t}
                        preview={
                            <div className="w-[300px]">
                                <ImageUpload onChange={(file) => console.log("Image:", file)} />
                            </div>
                        }
                        code={`<ImageUpload onChange={(file) => console.log("Image:", file)} />`}
                    />
                    <ComponentShowcase
                        id="transfer"
                        title={t('components.transferExample.title')}
                        description={t('components.transferExample.description')}
                        t={t}
                        preview={
                            <Transfer
                                dataSource={transferData}
                                value={transferTargetKeys}
                                onChange={setTransferTargetKeys}
                                leftTitle="All Roles"
                                rightTitle="Assigned Roles"
                            />
                        }
                        code={`<Transfer
    dataSource={transferData}
    value={transferTargetKeys}
    onChange={setTransferTargetKeys}
    leftTitle="All Roles"
    rightTitle="Assigned Roles"
/>`}
                    />
        </div>
    );
}

function DatePickerDemo() {
    const [date, setDate] = useState<Date>();
    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'zh-CN' ? zhCN : enUS;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale }) : <span>{t('components.datePickerExample.pickDate')}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={locale}
                />
            </PopoverContent>
        </Popover>
    );
}

function DateTimePickerDemo() {
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState('12:00');
    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'zh-CN' ? zhCN : enUS;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? `${format(date, "PPP", { locale })} ${time}` : <span>{t('components.dateTimePickerExample.pickDateTime')}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={locale}
                />
                <div className="p-3 border-t border-border flex justify-center">
                    <TimePicker value={time} onChange={setTime} />
                </div>
            </PopoverContent>
        </Popover>
    );
}

function TimePickerDemo() {
    return (
        <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <TimePicker />
        </div>
    );
}

