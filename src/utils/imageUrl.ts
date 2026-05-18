// Get the backend URL from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * Get the full image URL from a relative path
 * @param imagePath - The image path from the database (e.g., "/uploads/coaches/...")
 * @returns Full URL to the image
 */
export const getImageUrl = (imagePath: string | undefined | null): string => {
  if (!imagePath) return '';
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Fix duplicate /uploads/ if present
  let cleanPath = imagePath;
  if (cleanPath.includes('/uploads/uploads/')) {
    cleanPath = cleanPath.replace('/uploads/uploads/', '/uploads/');
  }
  
  // Ensure path starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  // Construct full URL using backend URL
  return `${BACKEND_URL}${cleanPath}`;
};

/**
 * Get image URL from an image object
 * @param image - Image object with url property
 * @returns Full URL to the image
 */
export const getImageUrlFromObject = (image: { url?: string } | undefined | null): string => {
  return getImageUrl(image?.url);
};

/**
 * Get thumbnail URL from an image object
 * @param image - Image object with thumbnail property
 * @returns Full URL to the thumbnail
 */
export const getThumbnailUrl = (image: { thumbnail?: string } | undefined | null): string => {
  return getImageUrl(image?.thumbnail);
};

export default {
  getImageUrl,
  getImageUrlFromObject,
  getThumbnailUrl,
  BACKEND_URL
};
