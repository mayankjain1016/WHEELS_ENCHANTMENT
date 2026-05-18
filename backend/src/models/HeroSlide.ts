import mongoose, { Document, Schema } from 'mongoose';
import { ImageObject } from '../types';

export interface IHeroSlide extends Document {
  title: string;
  subtitle: string;
  image: ImageObject;
  ctaText: string;
  ctaLink: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const heroSlideSchema = new Schema<IHeroSlide>(
  {
    title: {
      type: String,
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [500, 'Subtitle cannot exceed 500 characters']
    },
    image: {
      url: { type: String, required: true },
      thumbnail: { type: String, required: true },
      alt: { type: String, default: '' },
      filename: { type: String, required: true }
    },
    ctaText: {
      type: String,
      trim: true,
      maxlength: [50, 'CTA text cannot exceed 50 characters']
    },
    ctaLink: {
      type: String,
      trim: true
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret: any) => {
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Indexes
heroSlideSchema.index({ displayOrder: 1 });
heroSlideSchema.index({ isActive: 1 });

const HeroSlide = mongoose.model<IHeroSlide>('HeroSlide', heroSlideSchema);

export default HeroSlide;
