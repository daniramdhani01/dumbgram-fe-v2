'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useImagePreview } from '../hooks';
import { ImagePreview } from './index';
import { ALLOWED_MIME_TYPES } from '../utils/validation';
import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertTitle } from '@/components/ui/alert';

export default function CreatePost() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, error, handleFileSelect, handleRemove } = useImagePreview();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mt-8 flex flex-col gap-4">
      <h1 className="text-4xl mb-4">Create Post</h1>

      {/* Hidden file input - Requirements: 1.1, 1.2, 1.5 */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_MIME_TYPES.join(',')}
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Select image file"
      />

      {/* Upload button - Requirements: 1.1 */}
      <Button variant="rainbow" className="md:w-40" onClick={handleUploadClick}>
        Upload Photo
      </Button>

      {/* Error message - Requirements: 4.2 */}
      {error && (
        <Alert variant="destructive" className='md:w-fit'>
          <AlertCircleIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      {/* Image preview - Requirements: 2.1, 3.1 */}
      {previewUrl && <ImagePreview previewUrl={previewUrl} onRemove={handleRemove} />}

      <Textarea placeholder="Caption" className="h-36" />

      <Button variant="rainbow" className="md:w-36 md:self-end">
        Upload
      </Button>
    </div>
  );
}