import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../config/env';
import logger from '../utils/logger';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  destination?: string;
  filename?: string;
  path?: string;
}

export interface ImageVariant {
  url: string;
  width: number;
  height: number;
  format: string;
  size: number;
}

export interface ProcessedImage {
  original: ImageVariant;
  optimized: ImageVariant;
  thumbnail: ImageVariant;
  filename: string;
}

class ImageProcessor {
  private uploadPath: string;

  constructor() {
    this.uploadPath = env.UPLOAD_PATH;
  }

  /**
   * Process uploaded image - create optimized and thumbnail versions
   */
  async processImage(
    buffer: Buffer,
    entity: string,
    options: {
      maxWidth?: number;
      maxHeight?: number;
      thumbnailSize?: number;
      quality?: number;
    } = {}
  ): Promise<ProcessedImage> {
    const {
      maxWidth = 1920,
      maxHeight = 1920,
      thumbnailSize = 400,
      quality = 85
    } = options;

    try {
      const uuid = uuidv4();
      const timestamp = Date.now();
      const year = new Date().getFullYear();
      const month = String(new Date().getMonth() + 1).padStart(2, '0');

      const filename = `${entity}-${uuid}-${timestamp}`;
      const basePath = path.join(this.uploadPath, entity, String(year), month);

      // Ensure directories exist
      await this.ensureDirectories(basePath);

      // Get image metadata
      const metadata = await sharp(buffer).metadata();

      // 1. Save original (JPEG format)
      const originalPath = path.join(basePath, 'original', `${filename}.jpg`);
      await sharp(buffer)
        .jpeg({ quality: 95, mozjpeg: true })
        .toFile(originalPath);

      const originalStats = await fs.stat(originalPath);

      // 2. Create optimized WebP version
      const optimizedPath = path.join(basePath, 'optimized', `${filename}.webp`);
      const optimizedInfo = await sharp(buffer)
        .resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality })
        .toFile(optimizedPath);

      // 3. Create thumbnail
      const thumbnailPath = path.join(basePath, 'thumbnail', `${filename}-thumb.webp`);
      const thumbnailInfo = await sharp(buffer)
        .resize(thumbnailSize, thumbnailSize, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 80 })
        .toFile(thumbnailPath);

      logger.info(`Image processed successfully: ${filename}`);

      return {
        original: {
          url: this.getPublicUrl(originalPath),
          width: metadata.width || 0,
          height: metadata.height || 0,
          format: 'jpeg',
          size: originalStats.size
        },
        optimized: {
          url: this.getPublicUrl(optimizedPath),
          width: optimizedInfo.width,
          height: optimizedInfo.height,
          format: 'webp',
          size: optimizedInfo.size
        },
        thumbnail: {
          url: this.getPublicUrl(thumbnailPath),
          width: thumbnailInfo.width,
          height: thumbnailInfo.height,
          format: 'webp',
          size: thumbnailInfo.size
        },
        filename
      };
    } catch (error) {
      logger.error('Image processing error:', error);
      throw new Error('Failed to process image');
    }
  }

  /**
   * Process multiple images
   */
  async processMultipleImages(
    files: MulterFile[],
    entity: string,
    options?: Parameters<typeof this.processImage>[2]
  ): Promise<ProcessedImage[]> {
    const results: ProcessedImage[] = [];

    for (const file of files) {
      const processed = await this.processImage(file.buffer, entity, options);
      results.push(processed);
    }

    return results;
  }

  /**
   * Delete image and all its variants
   */
  async deleteImage(filename: string, entity: string): Promise<void> {
    try {
      // Extract timestamp from filename (format: entity-uuid-timestamp)
      const parts = filename.split('-');
      const timestamp = parseInt(parts[parts.length - 1], 10);
      
      if (isNaN(timestamp)) {
        logger.warn(`Invalid filename format, cannot extract timestamp: ${filename}`);
        return;
      }

      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');

      const basePath = path.join(this.uploadPath, entity, String(year), month);
      const variants = ['original', 'optimized', 'thumbnail'];
      const extensions = ['.jpg', '.webp', '-thumb.webp'];

      for (let i = 0; i < variants.length; i++) {
        const filePath = path.join(basePath, variants[i], `${filename}${extensions[i]}`);
        try {
          await fs.unlink(filePath);
        } catch (error) {
          logger.warn(`Failed to delete ${filePath}`);
        }
      }

      logger.info(`Image deleted successfully: ${filename}`);
    } catch (error) {
      logger.error('Image deletion error:', error);
      // Don't throw - allow deletion to continue even if image files are missing
    }
  }

  /**
   * Delete multiple images
   */
  async deleteMultipleImages(filenames: string[], entity: string): Promise<void> {
    for (const filename of filenames) {
      await this.deleteImage(filename, entity);
    }
  }

  /**
   * Ensure directory structure exists
   */
  private async ensureDirectories(basePath: string): Promise<void> {
    const variants = ['original', 'optimized', 'thumbnail'];

    for (const variant of variants) {
      const dir = path.join(basePath, variant);
      await fs.mkdir(dir, { recursive: true });
    }
  }

  /**
   * Convert absolute path to public URL
   */
  private getPublicUrl(absolutePath: string): string {
    // Normalize all backslashes to forward slashes
    const normalizedPath = absolutePath.replace(/\\/g, '/');
    
    // Get the resolved absolute upload path
    const resolvedUploadPath = path.resolve(this.uploadPath).replace(/\\/g, '/');
    
    // Remove the upload path to get relative path
    let relativePath = normalizedPath.replace(resolvedUploadPath, '');
    
    // Ensure it starts with /
    if (!relativePath.startsWith('/')) {
      relativePath = '/' + relativePath;
    }
    
    // The upload path is './uploads', so when we remove it, we get '/entity/year/month/variant/file'
    // We need to add '/uploads' prefix since express.static serves from '/uploads'
    return `/uploads${relativePath}`;
  }

  /**
   * Validate image file
   */
  validateImage(file: MulterFile): { valid: boolean; error?: string } {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = env.MAX_FILE_SIZE;

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return {
        valid: false,
        error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size exceeds maximum limit of ${maxSize / (1024 * 1024)}MB`
      };
    }

    return { valid: true };
  }
}

export default new ImageProcessor();
