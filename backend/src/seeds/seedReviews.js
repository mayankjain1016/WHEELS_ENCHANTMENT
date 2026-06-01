import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import Review from '../models/Review.js';

const reviews = [
  {
    name: 'Priya Sharma',
    role: 'Parent',
    rating: 5,
    comment: 'My daughter has grown so much in confidence since joining Wheels Enchntment. The coaches are patient, professional, and truly care about each child\'s progress. Highly recommend!',
    isApproved: true,
    isActive: true,
    displayOrder: 1,
  },
  {
    name: 'Rajesh Kumar',
    role: 'Parent',
    rating: 5,
    comment: 'The structured approach and safe environment gave us complete peace of mind. Our son loves his skating sessions and has made incredible progress in just 3 months.',
    isApproved: true,
    isActive: true,
    displayOrder: 2,
  },
  {
    name: 'Anita Desai',
    role: 'Parent',
    rating: 5,
    comment: 'Exceptional coaching and a wonderful community. The academy has exceeded all our expectations in every way. Worth every penny!',
    isApproved: true,
    isActive: true,
    displayOrder: 3,
  },
  {
    name: 'Amit Banerjee',
    role: 'Parent',
    rating: 5,
    comment: 'Best skating academy in Kolkata! My twins absolutely love their classes. The coaches are skilled and know how to keep kids engaged and motivated.',
    isApproved: true,
    isActive: true,
    displayOrder: 4,
  },
  {
    name: 'Sneha Chatterjee',
    role: 'Parent',
    rating: 5,
    comment: 'Professional training with a personal touch. My daughter went from being scared to skate to performing tricks confidently. Thank you Wheels Enchntment!',
    isApproved: true,
    isActive: true,
    displayOrder: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Parent',
    rating: 4,
    comment: 'Great academy with excellent facilities. My son has learned so much. The only suggestion would be to have more weekend batches available.',
    isApproved: true,
    isActive: true,
    displayOrder: 6,
  },
  {
    name: 'Meera Kapoor',
    role: 'Parent',
    rating: 5,
    comment: 'The coaches are amazing with kids! They make learning fun while maintaining discipline. My daughter looks forward to every class.',
    isApproved: true,
    isActive: true,
    displayOrder: 7,
  },
  {
    name: 'Arjun Mehta',
    role: 'Guardian',
    rating: 5,
    comment: 'Enrolled my nephew here and couldn\'t be happier. The progress tracking and regular updates keep us informed. Highly professional setup.',
    isApproved: true,
    isActive: true,
    displayOrder: 8,
  },
  {
    name: 'Kavita Reddy',
    role: 'Parent',
    rating: 5,
    comment: 'Safety is their top priority and it shows. All equipment is well-maintained and coaches are always vigilant. As a parent, that\'s what matters most.',
    isApproved: true,
    isActive: true,
    displayOrder: 9,
  },
  {
    name: 'Rohit Malhotra',
    role: 'Parent',
    rating: 5,
    comment: 'From beginner to intermediate level in just 6 months! The structured curriculum really works. My son is now teaching his friends!',
    isApproved: true,
    isActive: true,
    displayOrder: 10,
  },
  {
    name: 'Deepa Nair',
    role: 'Parent',
    rating: 5,
    comment: 'The best investment we made for our child\'s physical activity. She\'s more confident, disciplined, and healthy. Thank you team!',
    isApproved: true,
    isActive: true,
    displayOrder: 11,
  },
  {
    name: 'Sanjay Gupta',
    role: 'Parent',
    rating: 4,
    comment: 'Very good academy with dedicated coaches. My daughter enjoys every session. Would love to see more advanced level training options.',
    isApproved: true,
    isActive: true,
    displayOrder: 12,
  },
  {
    name: 'Neha Verma',
    role: 'Parent',
    rating: 5,
    comment: 'Just enrolled my son last week and already seeing positive changes. Looking forward to his skating journey!',
    isApproved: false,
    isActive: true,
    displayOrder: 0,
  },
  {
    name: 'Karan Joshi',
    role: 'Parent',
    rating: 5,
    comment: 'Excellent coaching staff and great atmosphere. My kids love coming here every weekend!',
    isApproved: false,
    isActive: true,
    displayOrder: 0,
  },
];

const seedReviews = async () => {
  try {
    console.log('🌱 Starting review seeding...');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wheels_enchantment');
    console.log('✅ Connected to MongoDB');

    await Review.deleteMany({});
    console.log('🗑️  Cleared existing reviews');

    const insertedReviews = await Review.insertMany(reviews);
    console.log(`✅ Inserted ${insertedReviews.length} reviews`);

    const approvedCount = insertedReviews.filter(r => r.isApproved).length;
    const pendingCount = insertedReviews.filter(r => !r.isApproved).length;
    
    console.log('\n📊 Summary:');
    console.log(`   Total Reviews: ${insertedReviews.length}`);
    console.log(`   Approved: ${approvedCount}`);
    console.log(`   Pending: ${pendingCount}`);
    console.log(`   Average Rating: ${(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)} ⭐`);

    console.log('\n🎉 Review seeding completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding reviews:', error);
    process.exit(1);
  }
};

seedReviews();
