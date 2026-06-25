import * as React from "react"
import { ImagePlus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface ImageUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  onChange?: (file: File | null) => void
  value?: string | null // Can be a URL or object URL
}

export const ImageUpload = React.forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ className, onChange, value = null, ...props }, ref) => {
    const [dragActive, setDragActive] = React.useState(false)
    const [preview, setPreview] = React.useState<string | null>(value)
    const [, setFile] = React.useState<File | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
      if (value !== undefined) {
        setPreview(value)
      }
    }, [value])

    // Cleanup object URL
    React.useEffect(() => {
      return () => {
        if (preview && preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview)
        }
      }
    }, [preview])

    const handleFile = (newFile: File | null) => {
      if (!newFile) {
        setFile(null)
        setPreview(null)
        onChange?.(null)
        return
      }

      if (!newFile.type.startsWith('image/')) {
        // You might want to trigger a toast here
        console.error("Please upload an image file")
        return
      }

      setFile(newFile)
      const objectUrl = URL.createObjectURL(newFile)
      setPreview(objectUrl)
      onChange?.(newFile)
    }

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true)
      } else if (e.type === "dragleave") {
        setDragActive(false)
      }
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0])
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0])
      }
    }

    const removeImage = () => {
      handleFile(null)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }

    return (
      <div className={cn("w-full", className)}>
        {!preview ? (
          <div
            className={cn(
              "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg transition-colors bg-muted/20 cursor-pointer hover:bg-muted/50 overflow-hidden",
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
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
              accept="image/*"
              className="hidden"
              onChange={handleChange}
              {...props}
            />
            <ImagePlus className="w-10 h-10 mb-3 text-muted-foreground" />
            <p className="mb-1 text-sm font-medium">
              <span className="text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              SVG, PNG, JPG or GIF (max. 5MB)
            </p>
          </div>
        ) : (
          <div className="relative group rounded-lg overflow-hidden border">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={removeImage}
                className="shadow-lg"
              >
                <X className="w-4 h-4 mr-2" />
                Remove Image
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
)
ImageUpload.displayName = "ImageUpload"
