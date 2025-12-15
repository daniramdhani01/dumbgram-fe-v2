import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface ImagePreviewProps {
  previewUrl: string
  onRemove: () => void
}

export default function ImagePreview({ previewUrl, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative w-full max-w-md">
      <img
        src={previewUrl}
        alt="Preview"
        className="w-full h-auto object-contain rounded-lg"
      />
      <Button
        variant="destructive"
        size="icon-sm"
        className="absolute top-2 right-2"
        onClick={onRemove}
        aria-label="Remove image"
      >
        <X className="size-4" />
      </Button>
    </div>
  )
}
