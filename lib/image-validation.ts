// Validation constants and types for image upload

/**
 * Allowed MIME types (excluding GIF)
 */
export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/bmp',
  'image/svg+xml',
] as const;

/**
 * Allowed file extensions
 */
export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.svg'] as const;

/**
 * Maximum file size: 1MB in bytes
 */
export const MAX_FILE_SIZE = 1 * 1024 * 1024;

/**
 * Magic bytes signatures for image type validation
 */
export const MAGIC_BYTES: Record<string, number[]> = {
  'image/jpeg': [0xff, 0xd8, 0xff],
  'image/png': [0x89, 0x50, 0x4e, 0x47],
  'image/webp': [0x52, 0x49, 0x46, 0x46],
  'image/bmp': [0x42, 0x4d],
  'image/svg+xml': [0x3c],
};

/**
 * GIF magic bytes signature (to explicitly reject)
 */
export const GIF_MAGIC_BYTES = [0x47, 0x49, 0x46];

export type ValidationError =
  | 'INVALID_EXTENSION'
  | 'INVALID_SIZE'
  | 'INVALID_MAGIC_BYTES'
  | 'GIF_NOT_ALLOWED';

export interface ValidationResult {
  isValid: boolean;
  error?: ValidationError;
}

export function validateFileExtension(filename: string): boolean {
  const extension = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  return ALLOWED_EXTENSIONS.includes(extension as (typeof ALLOWED_EXTENSIONS)[number]);
}

export function validateFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

export function validateMagicBytes(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      if (!arrayBuffer) {
        resolve(false);
        return;
      }

      const bytes = new Uint8Array(arrayBuffer);

      if (matchesSignature(bytes, GIF_MAGIC_BYTES)) {
        resolve(false);
        return;
      }

      for (const signature of Object.values(MAGIC_BYTES)) {
        if (matchesSignature(bytes, signature)) {
          resolve(true);
          return;
        }
      }

      resolve(false);
    };

    reader.onerror = () => {
      resolve(false);
    };

    const blob = file.slice(0, 12);
    reader.readAsArrayBuffer(blob);
  });
}

function matchesSignature(bytes: Uint8Array, signature: number[]): boolean {
  if (bytes.length < signature.length) {
    return false;
  }
  return signature.every((byte, index) => bytes[index] === byte);
}
