export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_MB = 10;

export function validateImages(files: File[]): string | null {
  for (const file of files) {
    fileValidation(file);
  }
  return null;
}

export function validateSingleImage(
  file: File | null | undefined
): string | null {
  fileValidation(file);

  return null;
}

function fileValidation(file: File | null | undefined) {
  if (!file) return null;

  if (!ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
    return 'Only JPEG, PNG or WEBP images are allowed.';
  }
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > MAX_IMAGE_MB) {
    return `Image exceeds ${MAX_IMAGE_MB} MB.`;
  }
}
