import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wheels_enchantment';

// Gallery Schema
const gallerySchema = new mongoose.Schema({
  title: String,
  caption: String,
  image: {
    url: String,
    thumbnail: String,
    alt: String,
    filename: String,
    width: Number,
    height: Number
  },
  category: String,
  tags: [String],
  uploadDate: Date,
  displayOrder: Number,
  isActive: Boolean
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);

async function fixGalleryImages() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    // Find all gallery images with broken URLs
    const images = await Gallery.find({
      'image.url': { $regex: '/uploadsuploads/' }
    });

    console.log(`Found ${images.length} images with broken URLs`);

    if (images.length === 0) {
      console.log('No broken images found. Checking all images...');
      const allImages = await Gallery.find({});
      console.log(`Total images in database: ${allImages.length}`);
      
      allImages.forEach(img => {
        console.log(`- ${img._id}: ${img.image?.url || 'NO URL'}`);
      });
    } else {
      // Delete broken images
      for (const image of images) {
        console.log(`Deleting broken image: ${image._id}`);
        console.log(`  URL: ${image.image.url}`);
        await Gallery.deleteOne({ _id: image._id });
        console.log(`  ✅ Deleted`);
      }
    }

    console.log('\n✅ Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixGalleryImages();
