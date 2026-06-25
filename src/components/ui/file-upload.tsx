import * as React from "react"
import { useTranslation } from "react-i18next"
import { UploadCloud, File, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  onChange?: (files: File[]) => void
  value?: File[]
  maxFiles?: number
  maxSizeInMB?: number
  formatsHint?: string
  error?: boolean
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, onChange, value, maxFiles = 0, maxSizeInMB = 10, formatsHint = "SVG, PNG, JPG or PDF", disabled = false, error = false, ...props }, ref) => {
    const { t } = useTranslation()
    const [dragActive, setDragActive] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>(value || [])
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Sync external value
    React.useEffect(() => {
      if (value !== undefined) {
        setFiles(value)
      }
    }, [value])

    const handleFiles = (newFiles: FileList | null) => {
      if (!newFiles) return
      const fileArray = Array.from(newFiles)
      let updatedFiles = [...files, ...fileArray]
      if (maxFiles > 0 && updatedFiles.length > maxFiles) {
        updatedFiles = updatedFiles.slice(0, maxFiles)
      }
      setFiles(updatedFiles)
      onChange?.(updatedFiles)
    }

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (disabled) return
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true)
      } else if (e.type === "dragleave") {
        setDragActive(false)
      }
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (disabled) return
      setDragActive(false)
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files)
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      if (disabled) return
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files)
      }
    }

    const removeFile = (index: number) => {
      const newFiles = [...files]
      newFiles.splice(index, 1)
      setFiles(newFiles)
      onChange?.(newFiles)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }

    return (
      <div className={cn("w-full", className)}>
        <div
          className={cn(
            "relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg transition-colors bg-muted/20",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-muted/50",
            dragActive && !disabled ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            error && "border-destructive/60 bg-destructive/5 ring-1 ring-destructive/20"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          <input
            ref={(e) => {
              // inputRef assignment
              inputRef.current = e;
              if (typeof ref === 'function') {
                ref(e);
              } else if (ref) {
                ref.current = e;
              }
            }}
            type="file"
            className="hidden"
            onChange={handleChange}
            multiple={maxFiles !== 1}
            disabled={disabled}
            {...props}
          />
          <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
          <p className="mb-1 text-sm font-medium">
            <span className="text-primary">{t('common.fileUpload.clickToUpload', 'Click to upload')}</span> {t('common.fileUpload.dragAndDrop', 'or drag and drop')}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatsHint} (max. {maxSizeInMB}MB)
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-md bg-card shadow-sm">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <File className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={disabled}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!disabled) removeFile(idx)
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"
