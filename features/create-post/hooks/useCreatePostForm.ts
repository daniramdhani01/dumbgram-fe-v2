'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useImagePreview } from './useImagePreview';

const createPostSchema = z.object({
  image: z.instanceof(File, { message: 'Photo is required' }),
  caption: z.string().optional(),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;

export function useCreatePostForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, error: imageError, selectedFile, handleFileSelect, handleRemove } = useImagePreview();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
  });

  // Sync selectedFile dengan form
  useEffect(() => {
    if (selectedFile) {
      setValue('image', selectedFile);
      clearErrors('image');
    }
  }, [selectedFile, setValue, clearErrors]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    handleRemove();
    setValue('image', undefined as unknown as File);
  }, [handleRemove, setValue]);

  const onSubmit = useCallback((data: CreatePostFormData) => {
    console.log('Form submitted:', data);
    // TODO: Handle form submission
  }, []);

  return {
    fileInputRef,
    previewUrl,
    imageError,
    formError: errors.image?.message,
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleUploadClick,
    handleFileSelect,
    handleRemoveImage,
  };
}
