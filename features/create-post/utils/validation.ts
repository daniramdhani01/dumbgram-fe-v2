// Validation constants and types for image preview upload
// Requirements: 1.2, 4.1, 5.1

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
  'image/webp': [0x52, 0x49, 0x46, 0x46], // RIFF
  'image/bmp': [0x42, 0x4d],
  'image/svg+xml': [0x3c], // '<' character
};

/**
 * GIF magic bytes signature (to explicitly reject)
 */
export const GIF_MAGIC_BYTES = [0x47, 0x49, 0x46]; // 'GIF'

/**
 * Validation error types
 */
export type ValidationError =
  | 'INVALID_EXTENSION'
  | 'INVALID_SIZE'
  | 'INVALID_MAGIC_BYTES'
  | 'GIF_NOT_ALLOWED';

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  error?: ValidationError;
}


/**
 * Validates file extension against allowed types
 * Requirements: 1.3, 1.4
 *
 * @param filename - The name of the file to validate
 * @returns true if extension is allowed, false for .gif and other extensions
 */
export function validateFileExtension(filename: string): boolean {
  const extension = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  return ALLOWED_EXTENSIONS.includes(extension as (typeof ALLOWED_EXTENSIONS)[number]);
}

/**
 * Validates file size against maximum allowed size (1MB)
 * Requirements: 4.1
 *
 * @param file - The File object to validate
 * @returns true if file size is <= 1MB, false otherwise
 */
export function validateFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

/**
 * Validates file content by checking magic bytes signature
 * Requirements: 5.1, 5.2, 5.3
 *
 * @param file - The File object to validate
 * @returns Promise<boolean> - true if magic bytes match allowed image type, false for GIF or invalid
 */
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

      // Check for GIF signature first (reject GIF files)
      if (matchesSignature(bytes, GIF_MAGIC_BYTES)) {
        resolve(false);
        return;
      }

      // Check against allowed image signatures
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

    // Read only the first 12 bytes (enough for all signatures including WebP)
    const blob = file.slice(0, 12);
    reader.readAsArrayBuffer(blob);
  });
}

/**
 * Helper function to check if bytes match a signature
 */
function matchesSignature(bytes: Uint8Array, signature: number[]): boolean {
  if (bytes.length < signature.length) {
    return false;
  }
  return signature.every((byte, index) => bytes[index] === byte);
}
