'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  validateFileExtension,
  validateFileSize,
  validateMagicBytes,
} from '../utils/validation';

/**
 * Return type for useImagePreview hook
 * Requirements: 2.1
 */
export interface UseImagePreviewReturn {
  previewUrl: string | null;
  error: string | null;
  selectedFile: File | null;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: () => void;
  clearError: () => void;
}

/**
 * Error messages for validation failures
 */
const ERROR_MESSAGES = {
  INVALID_EXTENSION: 'File format not supported. Use JPG, PNG, WebP, BMP, or SVG.',
  GIF_NOT_ALLOWED: 'GIF format is not supported.',
  INVALID_SIZE: 'Maximum file size is 1MB.',
  INVALID_MAGIC_BYTES: 'File is invalid or corrupted.',
} as const;

/**
 * Custom hook for managing image preview state and validation
 * Requirements: 2.1, 1.3, 4.1, 4.3, 5.1, 2.2, 2.3, 3.2, 3.3, 4.2
 */
export function useImagePreview(): UseImagePreviewReturn {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Ref to store current Object URL for cleanup
  const objectUrlRef = useRef<string | null>(null);

  /**
   * Revokes the current Object URL to prevent memory leaks
   * Requirements: 2.3, 3.3
   */
  const revokeCurrentUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  /**
   * Handles file selection with validation
   * Requirements: 1.3, 4.1, 4.3, 5.1
   */
  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      
      // Reset input value to allow selecting the same file again
      event.target.value = '';
      
      if (!file) {
        return;
      }

      // Validate file extension
      // Requirements: 1.3, 1.4
      if (!validateFileExtension(file.name)) {
        const isGif = file.name.toLowerCase().endsWith('.gif');
        setError(isGif ? ERROR_MESSAGES.GIF_NOT_ALLOWED : ERROR_MESSAGES.INVALID_EXTENSION);
        return;
      }

      // Validate file size
      // Requirements: 4.1
      if (!validateFileSize(file)) {
        setError(ERROR_MESSAGES.INVALID_SIZE);
        return;
      }

      // Validate magic bytes
      // Requirements: 5.1, 5.2
      const isValidMagicBytes = await validateMagicBytes(file);
      if (!isValidMagicBytes) {
        setError(ERROR_MESSAGES.INVALID_MAGIC_BYTES);
        return;
      }

      // All validations passed - create Object URL
      // Requirements: 2.2, 2.3
      revokeCurrentUrl();
      const newUrl = URL.createObjectURL(file);
      objectUrlRef.current = newUrl;
      
      setPreviewUrl(newUrl);
      setSelectedFile(file);
      setError(null);
    },
    [revokeCurrentUrl]
  );

  /**
   * Removes the current preview and clears state
   * Requirements: 3.2, 3.3
   */
  const handleRemove = useCallback(() => {
    revokeCurrentUrl();
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);
  }, [revokeCurrentUrl]);

  /**
   * Clears the error state
   * Requirements: 4.2
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Auto-clear error after 5 seconds
   * Requirements: 4.2
   */
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  /**
   * Cleanup Object URL on unmount
   * Requirements: 2.3
   */
  useEffect(() => {
    return () => {
      revokeCurrentUrl();
    };
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
