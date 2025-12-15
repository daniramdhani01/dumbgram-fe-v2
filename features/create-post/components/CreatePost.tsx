'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCreatePostForm } from '../hooks';
import { ImagePreview } from './index';
import { ALLOWED_MIME_TYPES } from '../utils/validation';
import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertTitle } from '@/components/ui/alert';

export default function CreatePost() {
  const {
    fileInputRef,
    previewUrl,
    imageError,
    formError,
    register,
    handleSubmit,
    handleUploadClick,
    handleFileSelect,
    handleRemoveImage,
  } = useCreatePostForm();

  const errorMessage = imageError || formError;

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
      <h1 className="text-4xl mb-4">Create Post</h1>

      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_MIME_TYPES.join(',')}
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Select image file"
      />

      <Button type="button" variant="rainbow" className="md:w-40" onClick={handleUploadClick}>
        Upload Photo
      </Button>

      {errorMessage && (
        <Alert variant="destructive" className="md:w-fit">
          <AlertCircleIcon />
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
      )}

      {previewUrl && <ImagePreview previewUrl={previewUrl} onRemove={handleRemoveImage} />}

      <Textarea placeholder="Caption" className="h-36" {...register('caption')} />

      <Button type="submit" variant="rainbow" className="md:w-36 md:self-end">
        Upload
      </Button>
    </form>
  );
}