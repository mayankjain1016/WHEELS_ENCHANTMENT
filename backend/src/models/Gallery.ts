import mongoose, { Document, Schema } from 'mongoose';
import { GalleryCategory, ImageObject } from '../types';

export interface IGallery extends Document {
  title: string;
  caption: string;
  image: ImageObject & {
    width: number;
    height: number;
  };
  category: GalleryCategory;
  tags: string[];
  uploadDate: Date;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
}

const gallerySchema = new Schema<IGallery>(
  {
    title: {
      type: String,
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    caption: {
      type: String,
      trim: true,
      maxlength: [500, 'Caption cannot exceed 500 characters']
    },
    image: {
      url: { type: String, required: true },
      thumbnail: { type: String, required: true },
      alt: { type: String, default: '' },
      filename: { type: String, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true }
    },
    category: {
      type: String,
      enum: {
        values: ['Training', 'Competition', 'Events', 'Facilities', 'Students', 'Other'],
        message: '{VALUE} is not a valid category'
      },
      required: [true, 'Category is required']
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true
      }
    ],
    uploadDate: {
      type: Date,
      default: Date.now
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
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      transform: (_, ret: any) => {
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Indexes
gallerySchema.index({ category: 1 });
gallerySchema.index({ tags: 1 });
gallerySchema.index({ uploadDate: -1 });
gallerySchema.index({ displayOrder: 1 });
gallerySchema.index({ isActive: 1 });

const Gallery = mongoose.model<IGallery>('Gallery', gallerySchema);

export default Gallery;
