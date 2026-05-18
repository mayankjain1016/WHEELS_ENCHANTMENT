import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wheels_enchantment';

console.log('🔧 Fixing duplicate /uploads/ in database...\n');

try {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB\n');

  const db = mongoose.connection.db;

  // Fix Coaches
  console.log('📦 Fixing Coaches...');
  const coachesResult = await db.collection('coaches').updateMany(
    { 
      $or: [
        { 'image.url': { $regex: '/uploads/uploads/' } },
        { 'image.thumbnail': { $regex: '/uploads/uploads/' } }
      ]
    },
    [
      {
        $set: {
          'image.url': {
            $replaceAll: {
              input: '$image.url',
              find: '/uploads/uploads/',
              replacement: '/uploads/'
            }
          },
          'image.thumbnail': {
            $replaceAll: {
              input: '$image.thumbnail',
              find: '/uploads/uploads/',
              replacement: '/uploads/'
            }
          }
        }
      }
    ]
  );
  console.log(`   ✅ Fixed ${coachesResult.modifiedCount} coaches\n`);

  // Fix Products
  console.log('📦 Fixing Products...');
  const products = await db.collection('products').find({}).toArray();
  let productsFixed = 0;
  
  for (const product of products) {
    if (product.images && Array.isArray(product.images)) {
      let needsUpdate = false;
      const fixedImages = product.images.map(img => {
        if (img.url && img.url.includes('/uploads/uploads/')) {
          needsUpdate = true;
          return {
            ...img,
            url: img.url.replace(/\/uploads\/uploads\//g, '/uploads/'),
            thumbnail: img.thumbnail ? img.thumbnail.replace(/\/uploads\/uploads\//g, '/uploads/') : img.thumbnail
          };
        }
        return img;
      });
      
      if (needsUpdate) {
        await db.collection('products').updateOne(
          { _id: product._id },
          { $set: { images: fixedImages } }
        );
        productsFixed++;
      }
    }
  }
  console.log(`   ✅ Fixed ${productsFixed} products\n`);

  // Fix Gallery
  console.log('📦 Fixing Gallery...');
  const galleryResult = await db.collection('galleryimages').updateMany(
    { 
      $or: [
        { 'image.url': { $regex: '/uploads/uploads/' } },
        { 'image.thumbnail': { $regex: '/uploads/uploads/' } }
      ]
    },
    [
      {
        $set: {
          'image.url': {
            $replaceAll: {
              input: '$image.url',
              find: '/uploads/uploads/',
              replacement: '/uploads/'
            }
          },
          'image.thumbnail': {
            $replaceAll: {
              input: '$image.thumbnail',
              find: '/uploads/uploads/',
              replacement: '/uploads/'
            }
          }
        }
      }
    ]
  );
  console.log(`   ✅ Fixed ${galleryResult.modifiedCount} gallery images\n`);

  console.log('✅ All done! Database fixed.\n');
  console.log('Now restart your backend server: npm run dev\n');

} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  await mongoose.disconnect();
  console.log('👋 Disconnected from MongoDB');
  process.exit(0);
}
