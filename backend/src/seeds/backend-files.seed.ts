import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import database from '../config/database';
import Gallery from '../models/Gallery';
import imageProcessor from '../services/image.service';
import logger from '../utils/logger';
import { env } from '../config/env';

interface BackendFileData {
  filename: string;
  category: string;
  tags: string[];
  title: string;
  caption: string;
}

// Auto-generate metadata based on filename patterns
const generateMetadata = (filename: string): Omit<BackendFileData, 'filename'> => {
  const lowerName = filename.toLowerCase();
  
  // Determine category based on filename patterns
  let category = 'Other';
  let tags: string[] = ['skating', 'academy'];
  let title = filename.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
  let caption = 'Gallery image from Wheels Enchantment Academy';

  // Category detection
  if (lowerName.includes('training') || lowerName.includes('coach') || lowerName.includes('practice')) {
    category = 'Training';
    tags = ['training', 'coaching', 'practice', 'skating', 'academy'];
    caption = 'Training session at our academy';
  } else if (lowerName.includes('event') || lowerName.includes('competition') || lowerName.includes('show')) {
    category = 'Events';
    tags = ['event', 'competition', 'skating', 'showcase', 'academy'];
    caption = 'Event moment captured';
  } else if (lowerName.includes('student') || lowerName.includes('kid') || lowerName.includes('child')) {
    category = 'Students';
    tags = ['students', 'learning', 'skating', 'academy', 'youth'];
    caption = 'Student learning journey';
  } else if (lowerName.includes('facility') || lowerName.includes('rink') || lowerName.includes('equipment')) {
    category = 'Facilities';
    tags = ['facilities', 'rink', 'equipment', 'skating', 'academy'];
    caption = 'Our professional facilities';
  } else {
    // Default to Training for most images
    category = 'Training';
    tags = ['training', 'skating', 'academy', 'practice'];
    caption = 'Skating academy activity';
  }

  return { category, tags, title, caption };
};

// Map all files from backend/files
const getBackendFilesData = (): BackendFileData[] => {
  const allFilenames = [
    '5D9B82AF-08C8-459C-82EC-D6EB4C673B0B.HEIC',
    '653BF8EF-74D4-47EA-BF28-EB3F12CF52E0.JPG.jpeg',
    '67542B2D-A14E-4594-B781-78064ECC6CFC.JPG.jpeg',
    '87A265F7-EE78-4EE3-93BA-90A97C098DE4.HEIC',
    'C5BE09DB-494F-43F7-BB62-4FEA8F7A1A62.HEIC',
    'C686244D-A5C4-434D-9C2A-932E224FF211.HEIC',
    'IMG_0312.JPG.jpeg',
    'IMG_0414.HEIC',
    'IMG_0416.HEIC',
    'IMG_0975.JPG.jpeg',
    'IMG_0976.JPG.jpeg',
    'IMG_1352.HEIC',
    'IMG_2394.JPG.jpeg',
    'IMG_2414.HEIC',
    'IMG_2442.JPG.jpeg',
    'IMG_2443.JPG.jpeg',
    'IMG_2444.JPG.jpeg',
    'IMG_2445.JPG.jpeg',
    'IMG_2446.JPG.jpeg',
    'IMG_2447.JPG.jpeg',
    'IMG_2448.JPG (1).jpeg',
    'IMG_2448.JPG.jpeg',
    'IMG_2449.JPG.jpeg',
    'IMG_2450.JPG.jpeg',
    'IMG_2451.JPG.jpeg',
    'IMG_2452.JPG.jpeg',
    'IMG_2453.JPG.jpeg',
    'IMG_2454.JPG.jpeg',
    'IMG_2455.JPG (1).jpeg',
    'IMG_2455.JPG.jpeg',
    'IMG_2456.JPG.jpeg',
    'IMG_2457.JPG.jpeg',
    'IMG_2458.JPG.jpeg',
    'IMG_2459.JPG.jpeg',
    'IMG_2460.JPG.jpeg',
    'IMG_2461.JPG.jpeg',
    'IMG_2462.JPG.jpeg',
    'IMG_2463.JPG.jpeg',
    'IMG_2464.JPG.jpeg',
    'IMG_2465.JPG.jpeg',
    'IMG_2466.JPG.jpeg',
    'IMG_2467.JPG.jpeg',
    'IMG_2468.JPG.jpeg',
    'IMG_2469.JPG.jpeg',
    'IMG_2470.JPG.jpeg',
    'IMG_2471.JPG.jpeg',
    'IMG_2472.JPG (1).jpeg',
    'IMG_2472.JPG.jpeg',
    'IMG_2473.JPG.jpeg',
    'IMG_2474.JPG.jpeg',
    'IMG_2475.JPG.jpeg',
    'IMG_2476.JPG (1).jpeg',
    'IMG_2476.JPG.jpeg',
    'IMG_2477.JPG.jpeg',
    'IMG_2478.JPG (1).jpeg',
    'IMG_2478.JPG.jpeg',
    'IMG_2479.JPG.jpeg',
    'IMG_2480.JPG.jpeg',
    'IMG_2481.JPG.jpeg',
    'IMG_2482.JPG.jpeg',
    'IMG_2483.JPG.jpeg',
    'IMG_2484.JPG.jpeg',
    'IMG_2485.JPG.jpeg',
    'IMG_2486.JPG.jpeg',
    'IMG_2487.JPG.jpeg',
    'IMG_2488.JPG.jpeg',
    'IMG_2489.JPG.jpeg',
    'IMG_2490.JPG.jpeg',
    'IMG_2491.JPG.jpeg',
    'IMG_2492.JPG.jpeg',
    'IMG_2724.HEIC',
    'IMG_4603.HEIC',
    'IMG_4752.HEIC',
    'IMG_5313.JPG.jpeg',
    'IMG_5676.HEIC',
    'IMG_5733.HEIC',
    'IMG_8075.JPG.jpeg',
    'IMG_8096.JPG.jpeg',
    'IMG_8782.JPG.jpeg',
    'IMG_8818.JPG.jpeg',
    'IMG_9326.HEIC'
  ];

  return allFilenames.map(filename => ({
    filename,
    ...generateMetadata(filename)
  }));
};

/**
 * Convert HEIC to JPEG using Sharp
 */
const convertHeicToJpeg = async (buffer: Buffer): Promise<Buffer> => {
  try {
    // Sharp can read HEIC and convert to JPEG
    const jpegBuffer = await sharp(buffer)
      .rotate() // Auto-rotate based on EXIF
      .jpeg({ quality: 95, mozjpeg: true })
      .toBuffer();
    return jpegBuffer;
  } catch (error) {
    logger.error('HEIC conversion error:', error);
    throw error;
  }
};

const seedBackendFiles = async () => {
  let processedCount = 0;
  let failedCount = 0;
  let skippedCount = 0;

  try {
    await database.connect();
    logger.info('🔄 Starting Backend Files Gallery Seed...');

    // Clear existing gallery (optional - comment out to append)
    const deleteResult = await Gallery.deleteMany({});
    logger.info(`🗑️  Cleared ${deleteResult.deletedCount} existing gallery items`);

    // Source directory
    const sourceDir = path.join(process.cwd(), 'files');
    logger.info(`📁 Source directory: ${sourceDir}`);

    // Get all files data
    const backendFilesData = getBackendFilesData();
    logger.info(`📊 Found ${backendFilesData.length} files to process`);

    // Create gallery documents
    const galleryDocuments: any[] = [];
    let displayOrder = 0;

    for (const fileData of backendFilesData) {
      try {
        const sourcePath = path.join(sourceDir, fileData.filename);
        
        // Check if source file exists
        try {
          await fs.access(sourcePath);
        } catch {
          logger.warn(`⚠️  File not found: ${fileData.filename}`);
          skippedCount++;
          continue;
        }

        // Read file
        let fileBuffer = await fs.readFile(sourcePath);

        // Handle HEIC format
        if (fileData.filename.toLowerCase().endsWith('.heic')) {
          logger.info(`🔄 Converting HEIC to JPEG: ${fileData.filename}`);
          try {
            fileBuffer = await convertHeicToJpeg(fileBuffer);
          } catch (error) {
            logger.error(`❌ Failed to convert HEIC: ${fileData.filename}`, error);
            failedCount++;
            continue;
          }
        }

        // Process image with image service
        const processedImage = await imageProcessor.processImage(fileBuffer, 'gallery');

        // Create gallery document
        const galleryDoc = {
          title: fileData.title,
          caption: fileData.caption,
          image: {
            url: processedImage.optimized.url,
            thumbnail: processedImage.thumbnail.url,
            alt: fileData.title,
            filename: processedImage.filename,
            width: processedImage.optimized.width,
            height: processedImage.optimized.height
          },
          category: fileData.category,
          tags: fileData.tags,
          uploadDate: new Date(),
          displayOrder: displayOrder++,
          isActive: true
        };

        galleryDocuments.push(galleryDoc);
        logger.info(`✅ Processed: ${fileData.filename} → ${fileData.category}`);
        processedCount++;
      } catch (error) {
        logger.error(`❌ Failed to process ${fileData.filename}:`, error);
        failedCount++;
      }
    }

    // Insert all gallery documents
    if (galleryDocuments.length > 0) {
      const createdGallery = await Gallery.insertMany(galleryDocuments);
      logger.info(`✅ Created ${createdGallery.length} gallery items in database`);
    }

    // Summary Statistics
    const categoryCount: { [key: string]: number } = {};
    galleryDocuments.forEach(doc => {
      categoryCount[doc.category] = (categoryCount[doc.category] || 0) + 1;
    });

    logger.info(`
      ╔════════════════════════════════════════════╗
      ║     Backend Files Gallery Seed Complete    ║
      ╠════════════════════════════════════════════╣
      ║ ✅ Processed:  ${String(processedCount).padStart(32)}║
      ║ ⏭️  Skipped:   ${String(skippedCount).padStart(32)}║
      ║ ❌ Failed:     ${String(failedCount).padStart(32)}║
      ║ 📊 Total:      ${String(backendFilesData.length).padStart(32)}║
      ╠════════════════════════════════════════════╣
      ║ Category Breakdown:                        ║
      ${Object.entries(categoryCount)
        .map(
          ([cat, count]) =>
            `║   • ${cat.padEnd(20)}: ${String(count).padStart(18)}║`
        )
        .join('\n')}
      ╚════════════════════════════════════════════╝
    `);

  } catch (error) {
    logger.error('❌ Backend files seed failed:', error);
    process.exit(1);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
};

// Run seed
seedBackendFiles();
