'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  validateFileExtension,
  validateFileSize,
  validateMagicBytes,
} from '@/lib/image-validation';

export interface UseImagePreviewReturn {
  previewUrl: string | null;
  error: string | null;
  selectedFile: File | null;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: () => void;
  clearError: () => void;
}

const ERROR_MESSAGES = {
  INVALID_EXTENSION: 'File format not supported. Use JPG, PNG, WebP, BMP, or SVG.',
  GIF_NOT_ALLOWED: 'GIF format is not supported.',
  INVALID_SIZE: 'Maximum file size is 1MB.',
  INVALID_MAGIC_BYTES: 'File is invalid or corrupted.',
} as const;

export function useImagePreview(): UseImagePreviewReturn {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const revokeCurrentUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = '';

      if (!file) return;

      if (!validateFileExtension(file.name)) {
        const isGif = file.name.toLowerCase().endsWith('.gif');
        setError(isGif ? ERROR_MESSAGES.GIF_NOT_ALLOWED : ERROR_MESSAGES.INVALID_EXTENSION);
        return;
      }

      if (!validateFileSize(file)) {
        setError(ERROR_MESSAGES.INVALID_SIZE);
        return;
      }

      const isValidMagicBytes = await validateMagicBytes(file);
      if (!isValidMagicBytes) {
        setError(ERROR_MESSAGES.INVALID_MAGIC_BYTES);
        return;
      }

      revokeCurrentUrl();
      const newUrl = URL.createObjectURL(file);
      objectUrlRef.current = newUrl;

      setPreviewUrl(newUrl);
      setSelectedFile(file);
      setError(null);
    },
    [revokeCurrentUrl]
  );

  const handleRemove = useCallback(() => {
    revokeCurrentUrl();
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);
  }, [revokeCurrentUrl]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    return () => revokeCurrentUrl();
  }, [revokeCurrentUrl]);

  return {
    previewUrl,
    error,
    selectedFile,
    handleFileSelect,
    handleRemove,
    clearError,
  };
}
