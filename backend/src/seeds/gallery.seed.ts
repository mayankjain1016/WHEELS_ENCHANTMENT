import path from 'path';
import fs from 'fs/promises';
import database from '../config/database';
import Gallery from '../models/Gallery';
import imageProcessor from '../services/image.service';
import logger from '../utils/logger';

interface GalleryImageData {
  filename: string;
  category: string;
  tags: string[];
  title: string;
  caption: string;
}

const galleryImages: GalleryImageData[] = [
  {
    filename: '67542B2D-A14E-4594-B781-78064ECC6CFC.JPG.jpeg',
    category: 'Training',
    tags: ['skating', 'training', 'practice'],
    title: 'Training Session',
    caption: 'Students practicing skating techniques'
  },
  {
    filename: 'IMG_0312.JPG.jpeg',
    category: 'Events',
    tags: ['event', 'competition', 'skating'],
    title: 'Event Showcase',
    caption: 'A moment from our skating event'
  },
  {
    filename: 'IMG_2394.JPG.jpeg',
    category: 'Students',
    tags: ['students', 'learning', 'skating'],
    title: 'Student Success',
    caption: 'Students achieving their skating goals'
  },
  {
    filename: 'IMG_2450.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'coaching', 'technique'],
    title: 'Coaching Moment',
    caption: 'Professional coaching during training'
  },
  {
    filename: 'IMG_2451.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'practice'],
    title: 'Practice Session 1',
    caption: 'Intensive training and practice'
  },
  {
    filename: 'IMG_2452.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'technique'],
    title: 'Technique Training',
    caption: 'Focus on skating technique improvement'
  },
  {
    filename: 'IMG_2453.JPG.jpeg',
    category: 'Students',
    tags: ['students', 'skating', 'progress'],
    title: 'Student Progress',
    caption: 'Students showing remarkable progress'
  },
  {
    filename: 'IMG_2454.JPG.jpeg',
    category: 'Facilities',
    tags: ['facilities', 'rink', 'training'],
    title: 'Training Facility',
    caption: 'Our state-of-the-art training facility'
  },
  {
    filename: 'IMG_2456.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'coaching'],
    title: 'Training Ground',
    caption: 'Training session at our facility'
  },
  {
    filename: 'IMG_2457.JPG.jpeg',
    category: 'Events',
    tags: ['event', 'skating', 'competition'],
    title: 'Event Action',
    caption: 'Action from our skating events'
  },
  {
    filename: 'IMG_2458.JPG.jpeg',
    category: 'Students',
    tags: ['students', 'skating', 'learning'],
    title: 'Student Learning',
    caption: 'Students enjoying their learning journey'
  },
  {
    filename: 'IMG_2459.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'team'],
    title: 'Team Training',
    caption: 'Team training and collaboration'
  },
  {
    filename: 'IMG_2460.JPG.jpeg',
    category: 'Facilities',
    tags: ['facilities', 'skating rink'],
    title: 'Skating Rink',
    caption: 'Our professional skating rink'
  },
  {
    filename: 'IMG_2461.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'technique', 'coaching'],
    title: 'Technical Training',
    caption: 'Advanced technical training session'
  },
  {
    filename: 'IMG_2462.JPG.jpeg',
    category: 'Events',
    tags: ['event', 'skating', 'performance'],
    title: 'Event Performance',
    caption: 'Spectacular performance at event'
  },
  {
    filename: 'IMG_2463.JPG.jpeg',
    category: 'Students',
    tags: ['students', 'achievement', 'skating'],
    title: 'Student Achievement',
    caption: 'Student achievement milestone'
  },
  {
    filename: 'IMG_2464.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'practice'],
    title: 'Practice Session 2',
    caption: 'Continued practice and improvement'
  },
  {
    filename: 'IMG_2465.JPG.jpeg',
    category: 'Facilities',
    tags: ['facilities', 'training area'],
    title: 'Training Area',
    caption: 'Our modern training area'
  },
  {
    filename: 'IMG_2466.JPG.jpeg',
    category: 'Events',
    tags: ['event', 'skating', 'showcase'],
    title: 'Event Showcase 2',
    caption: 'Showcase of skating excellence'
  },
  {
    filename: 'IMG_2467.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'technique'],
    title: 'Technique Session',
    caption: 'Focused technique improvement session'
  },
  {
    filename: 'IMG_2468.JPG.jpeg',
    category: 'Students',
    tags: ['students', 'skating', 'happy'],
    title: 'Happy Students',
    caption: 'Students enjoying their skating experience'
  },
  {
    filename: 'IMG_2469.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'coaching', 'development'],
    title: 'Coaching Session',
    caption: 'One-on-one coaching session'
  },
  {
    filename: 'IMG_2470.JPG.jpeg',
    category: 'Events',
    tags: ['event', 'skating', 'excitement'],
    title: 'Event Excitement',
    caption: 'Exciting moments from our events'
  },
  {
    filename: 'IMG_2471.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'balance'],
    title: 'Balance Training',
    caption: 'Balance and coordination training'
  },
  {
    filename: 'IMG_2472.JPG.jpeg',
    category: 'Students',
    tags: ['students', 'skating', 'success'],
    title: 'Student Success 2',
    caption: 'Another student success story'
  },
  {
    filename: 'IMG_2473.JPG.jpeg',
    category: 'Facilities',
    tags: ['facilities', 'equipment', 'skating'],
    title: 'Equipment Area',
    caption: 'Equipment and preparation area'
  },
  {
    filename: 'IMG_2474.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'speed'],
    title: 'Speed Training',
    caption: 'Speed and endurance training'
  },
  {
    filename: 'IMG_2475.JPG.jpeg',
    category: 'Events',
    tags: ['event', 'skating', 'participants'],
    title: 'Event Participants',
    caption: 'Participants in our skating events'
  },
  {
    filename: 'IMG_2476.JPG.jpeg',
    category: 'Students',
    tags: ['students', 'young', 'skating'],
    title: 'Young Students',
    caption: 'Young students learning to skate'
  },
  {
    filename: 'IMG_2477.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'group'],
    title: 'Group Training',
    caption: 'Group training session'
  },
  {
    filename: 'IMG_2478.JPG.jpeg',
    category: 'Facilities',
    tags: ['facilities', 'indoor rink'],
    title: 'Indoor Rink',
    caption: 'Indoor skating facility'
  },
  {
    filename: 'IMG_2479.JPG.jpeg',
    category: 'Events',
    tags: ['event', 'skating', 'community'],
    title: 'Community Event',
    caption: 'Community skating event'
  },
  {
    filename: 'IMG_2480.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'basics'],
    title: 'Basic Training',
    caption: 'Fundamental skating basics'
  },
  {
    filename: 'IMG_2481.JPG.jpeg',
    category: 'Students',
    tags: ['students', 'skating', 'certified'],
    title: 'Certified Students',
    caption: 'Our certified skating students'
  },
  {
    filename: 'IMG_2483.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'advanced'],
    title: 'Advanced Training',
    caption: 'Advanced skating techniques'
  },
  {
    filename: 'IMG_2484.JPG.jpeg',
    category: 'Events',
    tags: ['event', 'skating', 'championship'],
    title: 'Championship Event',
    caption: 'Championship skating event'
  },
  {
    filename: 'IMG_2485.JPG.jpeg',
    category: 'Students',
    tags: ['students', 'skating', 'determined'],
    title: 'Determined Students',
    caption: 'Students showing determination'
  },
  {
    filename: 'IMG_2486.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'coaching'],
    title: 'Expert Coaching',
    caption: 'Expert coaching and guidance'
  },
  {
    filename: 'IMG_2488.JPG.jpeg',
    category: 'Facilities',
    tags: ['facilities', 'modern', 'equipment'],
    title: 'Modern Facilities',
    caption: 'Modern skating facilities'
  },
  {
    filename: 'IMG_2489.JPG.jpeg',
    category: 'Events',
    tags: ['event', 'skating', 'victory'],
    title: 'Victory Moments',
    caption: 'Victory and celebration moments'
  },
  {
    filename: 'IMG_2490.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'discipline'],
    title: 'Disciplined Training',
    caption: 'Disciplined training regimen'
  },
  {
    filename: 'IMG_2491.JPG.jpeg',
    category: 'Students',
    tags: ['students', 'skating', 'together'],
    title: 'Students Together',
    caption: 'Students training together'
  },
  {
    filename: 'IMG_2492.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'skating', 'focus'],
    title: 'Focused Training',
    caption: 'Focused and intensive training'
  },
  {
    filename: 'IMG_5313.JPG.jpeg',
    category: 'Events',
    tags: ['event', 'skating', 'finale'],
    title: 'Event Finale',
    caption: 'Event finale and closing'
  },
  {
    filename: 'IMG_8096.JPG.jpeg',
    category: 'Facilities',
    tags: ['facilities', 'outdoor', 'skating'],
    title: 'Outdoor Facility',
    caption: 'Outdoor skating area'
  },
  {
    filename: 'IMG_8782.JPG.jpeg',
    category: 'Students',
    tags: ['students', 'outdoor', 'skating'],
    title: 'Outdoor Training',
    caption: 'Students training outdoors'
  },
  {
    filename: 'IMG_8818.JPG.jpeg',
    category: 'Training',
    tags: ['training', 'outdoor', 'skating'],
    title: 'Outdoor Practice',
    caption: 'Outdoor practice session'
  }
];

const seedGallery = async () => {
  let processedCount = 0;
  let failedCount = 0;

  try {
    await database.connect();
    logger.info('🔄 Starting Gallery Seed...');

    // Clear existing gallery
    const deleteResult = await Gallery.deleteMany({});
    logger.info(`🗑️  Cleared ${deleteResult.deletedCount} existing gallery items`);

    // Ensure source directory exists
    const sourceDir = path.join(process.cwd(), '..', '..', 'src', 'assets', 'Gallery_img');
    logger.info(`📁 Source directory: ${sourceDir}`);

    // Create gallery documents
    const galleryDocuments: any[] = [];
    let displayOrder = 0;

    for (const imageData of galleryImages) {
      try {
        const sourcePath = path.join(sourceDir, imageData.filename);
        
        // Check if source file exists
        try {
          await fs.access(sourcePath);
        } catch {
          logger.warn(`⚠️  Source file not found: ${imageData.filename}`);
          failedCount++;
          continue;
        }

        // Read file
        const fileBuffer = await fs.readFile(sourcePath);

        // Process image with image service
        const processedImage = await imageProcessor.processImage(fileBuffer, 'gallery');

        // Create gallery document
        const galleryDoc = {
          title: imageData.title,
          caption: imageData.caption,
          image: {
            url: processedImage.optimized.url,
            thumbnail: processedImage.thumbnail.url,
            alt: imageData.title,
            filename: processedImage.filename,
            width: processedImage.optimized.width,
            height: processedImage.optimized.height
          },
          category: imageData.category,
          tags: imageData.tags,
          uploadDate: new Date(),
          displayOrder: displayOrder++,
          isActive: true
        };

        galleryDocuments.push(galleryDoc);
        logger.info(`✅ Processed: ${imageData.title}`);
        processedCount++;
      } catch (error) {
        logger.error(`❌ Failed to process ${imageData.filename}:`, error);
        failedCount++;
      }
    }

    // Insert all gallery documents
    if (galleryDocuments.length > 0) {
      const createdGallery = await Gallery.insertMany(galleryDocuments);
      logger.info(`✅ Created ${createdGallery.length} gallery items`);
    }

    logger.info(`
      ╔════════════════════════════════════════╗
      ║       Gallery Seed Complete            ║
      ╠════════════════════════════════════════╣
      ║ ✅ Processed: ${String(processedCount).padEnd(28)}║
      ║ ❌ Failed: ${String(failedCount).padEnd(34)}║
      ║ 📸 Total: ${String(galleryImages.length).padEnd(35)}║
      ╚════════════════════════════════════════╝
    `);

  } catch (error) {
    logger.error('❌ Gallery seed failed:', error);
    process.exit(1);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
};

// Run seed
seedGallery();
