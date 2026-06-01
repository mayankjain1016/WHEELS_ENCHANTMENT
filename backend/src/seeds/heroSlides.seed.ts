import mongoose from 'mongoose';
import HeroSlide from '../models/HeroSlide';
import { env } from '../config/env';

const heroSlidesData = [
  {
    title: 'Where Young Skaters Build Confidence, Skill & Joy',
    subtitle: 'A premium skating academy where children learn with expert coaching, safe training practices, and a motivating environment designed for real growth.',
    ctaText: 'Join the Academy',
    ctaLink: '/contact',
    displayOrder: 0,
    isActive: true,
    image: {
      url: '/src/assets/Background_imgs/backgroundimg.jpeg',
      thumbnail: '/src/assets/Background_imgs/backgroundimg.jpeg',
      alt: 'Kids skating',
      filename: 'backgroundimg.jpeg'
    }
  },
  {
    title: 'Expert Coaching for Every Skill Level',
    subtitle: 'From beginners to advanced skaters, our certified coaches provide personalized training to help every child reach their full potential.',
    ctaText: 'Explore Programs',
    ctaLink: '/about',
    displayOrder: 1,
    isActive: true,
    image: {
      url: '/src/assets/Background_imgs/backgroundimg_2.jpeg',
      thumbnail: '/src/assets/Background_imgs/backgroundimg_2.jpeg',
      alt: 'Skating training',
      filename: 'backgroundimg_2.jpeg'
    }
  },
  {
    title: 'Safe & Fun Learning Environment',
    subtitle: 'State-of-the-art facilities and safety-first approach ensure your child learns skating in a secure and enjoyable atmosphere.',
    ctaText: 'Learn More',
    ctaLink: '/about',
    displayOrder: 2,
    isActive: true,
    image: {
      url: '/src/assets/Background_imgs/backgroundimg_3.jpeg',
      thumbnail: '/src/assets/Background_imgs/backgroundimg_3.jpeg',
      alt: 'Safe skating',
      filename: 'backgroundimg_3.jpeg'
    }
  }
];

async function seedHeroSlides() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing hero slides
    await HeroSlide.deleteMany({});
    console.log('Cleared existing hero slides');

    // Insert new hero slides
    const slides = await HeroSlide.insertMany(heroSlidesData);
    console.log(`✅ Successfully seeded ${slides.length} hero slides`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding hero slides:', error);
    process.exit(1);
  }
}

seedHeroSlides();
