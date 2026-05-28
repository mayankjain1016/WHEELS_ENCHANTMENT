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

async function checkCoachImagePaths() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const coaches = await Coach.find({});
    console.log(`Found ${coaches.length} coaches:\n`);

    coaches.forEach((coach, i) => {
      console.log(`${i + 1}. ${coach.name}`);
      console.log(`   URL: ${coach.image?.url || 'N/A'}`);
      console.log(`   Thumbnail: ${coach.image?.thumbnail || 'N/A'}`);
      console.log(`   Filename: ${coach.image?.filename || 'N/A'}\n`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCoachImagePaths();
