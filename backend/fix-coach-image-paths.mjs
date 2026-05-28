import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const coachSchema = new mongoose.Schema({
  name: String,
  image: {
    url: String,
    thumbnail: String,
    alt: String,
    filename: String
  }
}, { timestamps: true });

const Coach = mongoose.model('Coach', coachSchema);

async function fixCoachImagePaths() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const coaches = await Coach.find({});
    console.log(`Found ${coaches.length} coaches`);

    let updated = 0;
    for (const coach of coaches) {
      if (coach.image?.url?.includes('/src/assets/Coachs/')) {
        const filename = path.basename(coach.image.url);
        const newUrl = `/uploads/coaches/${filename}`;
        const newThumbnail = `/uploads/coaches/${filename}`;
        
        coach.image.url = newUrl;
        coach.image.thumbnail = newThumbnail;
        coach.image.filename = filename;
        
        await coach.save();
        console.log(`✓ Updated ${coach.name}: ${newUrl}`);
        updated++;
      }
    }

    console.log(`\n✓ Updated ${updated} coach image paths`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixCoachImagePaths();
