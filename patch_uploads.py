import re

# Patch file-upload.tsx
with open("src/components/ui/file-upload.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("// @ts-ignore", "// @ts-expect-error type override")
with open("src/components/ui/file-upload.tsx", "w", encoding="utf-8") as f:
    f.write(content)

# Patch image-upload.tsx
with open("src/components/ui/image-upload.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("const [file, setFile] = React.useState<File | null>(null)", "const [, setFile] = React.useState<File | null>(null)")
content = content.replace("// @ts-ignore", "// @ts-expect-error type override")
with open("src/components/ui/image-upload.tsx", "w", encoding="utf-8") as f:
    f.write(content)
