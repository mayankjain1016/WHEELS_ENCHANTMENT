import mongoose, { Document, Schema } from 'mongoose';
import { ImageObject } from '../types';

export interface ITestimonial extends Document {
  text: string;
  authorName: string;
  authorRole: string;
  rating: number;
  image?: ImageObject;
  isApproved: boolean;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    text: {
      type: String,
      required: [true, 'Testimonial text is required'],
      trim: true,
      maxlength: [1000, 'Text cannot exceed 1000 characters']
    },
    authorName: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    authorRole: {
      type: String,
      trim: true,
      maxlength: [100, 'Role cannot exceed 100 characters'],
      default: 'Parent'
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
      default: 5
    },
    image: {
      url: { type: String },
      thumbnail: { type: String },
      alt: { type: String, default: '' },
      filename: { type: String }
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    displayOrder: {
      type: Number,
      default: 0
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
testimonialSchema.index({ isApproved: 1, isFeatured: 1 });
testimonialSchema.index({ displayOrder: 1 });
testimonialSchema.index({ createdAt: -1 });

const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);

export default Testimonial;
