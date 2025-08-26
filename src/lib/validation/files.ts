export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_MB = 10;

export function validateImages(files: File[]): string | null {
  for (const f of files) {
    if (!ALLOWED_IMAGE_TYPES.includes(f.type as any)) {
      return 'Only JPEG, PNG or WEBP images are allowed.';
    }
    const sizeMB = f.size / (1024 * 1024);
    if (sizeMB > MAX_IMAGE_MB) {
      return `Image exceeds ${MAX_IMAGE_MB} MB.`;
    }
  }
  return null;
}
