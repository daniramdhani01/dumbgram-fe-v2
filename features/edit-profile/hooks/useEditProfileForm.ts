'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useImagePreview } from '@/hooks/useImagePreview';

const editProfileSchema = z.object({
  image: z.instanceof(File, { message: 'Photo is required' }),
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  bio: z.string().optional(),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

export function useEditProfileForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, error: imageError, selectedFile, handleFileSelect, handleRemove } = useImagePreview();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
  });

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

  const onSubmit = useCallback((data: EditProfileFormData) => {
    console.log('Form submitted:', data);
    // TODO: Handle form submission
  }, []);

  return {
    fileInputRef,
    previewUrl,
    imageError,
    errors: {
      image: errors.image?.message,
      name: errors.name?.message,
      username: errors.username?.message,
    },
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleUploadClick,
    handleFileSelect,
    handleRemoveImage,
  };
}
