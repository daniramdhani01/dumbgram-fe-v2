'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import ImagePreview from '@/components/shared/ImagePreview';
import { ALLOWED_MIME_TYPES } from '@/lib/image-validation';
import { useEditProfileForm } from '../hooks';

function EditProfile() {
  const {
    fileInputRef,
    previewUrl,
    imageError,
    errors,
    register,
    handleSubmit,
    handleUploadClick,
    handleFileSelect,
    handleRemoveImage,
  } = useEditProfileForm();

  const errorMessage = imageError || errors.image;

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
      <h1 className="text-4xl mb-4">Edit Profile</h1>

      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_MIME_TYPES.join(',')}
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Select profile photo"
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

      <div className="flex flex-col gap-1">
        <Input placeholder="Name" {...register('name')} />
        {errors.name && <span className="text-sm text-destructive">{errors.name}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <Input placeholder="Username" {...register('username')} />
        {errors.username && <span className="text-sm text-destructive">{errors.username}</span>}
      </div>

      <Textarea placeholder="Bio" className="h-36" {...register('bio')} />

      <Button type="submit" variant="rainbow" className="md:w-36 md:self-end">
        Save
      </Button>
    </form>
  );
}

export default EditProfile;