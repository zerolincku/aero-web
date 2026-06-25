import re

with open('src/pages/Components.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix imports
content = content.replace(
    "import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';",
    "import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';"
)

new_preview = """                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline">Open Sheet</Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Edit profile</SheetTitle>
                                        <SheetDescription>
                                            Make changes to your profile here. Click save when you're done.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4 px-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="role" className="text-right">
                                                Role
                                            </Label>
                                            <div className="col-span-3">
                                                <Select defaultValue="admin">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="admin">Admin</SelectItem>
                                                        <SelectItem value="user">User</SelectItem>
                                                        <SelectItem value="guest">Guest</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <SheetFooter className="mt-auto flex justify-end gap-2 px-4 pb-4">
                                        <SheetClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Button type="submit">Save changes</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>"""

new_code = """`<Sheet>
    <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
    </SheetTrigger>
    <SheetContent>
        <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
                Make changes to your profile here. Click save when you're done.
            </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 px-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                    Role
                </Label>
                <div className="col-span-3">
                    <Select defaultValue="admin">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="guest">Guest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
        <SheetFooter className="mt-auto flex justify-end gap-2 px-4 pb-4">
            <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
            </SheetClose>
            <SheetClose asChild>
                <Button type="submit">Save changes</Button>
            </SheetClose>
        </SheetFooter>
    </SheetContent>
</Sheet>`"""

old_preview_pattern = r"                            <Sheet>.*?</Sheet>"
old_code_pattern = r"`<Sheet>\n.*?</Sheet>`"

# Use DOTALL to match across newlines
content = re.sub(old_preview_pattern, new_preview, content, flags=re.DOTALL, count=1)
content = re.sub(old_code_pattern, new_code, content, flags=re.DOTALL, count=1)

with open('src/pages/Components.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
