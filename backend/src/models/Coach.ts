import mongoose, { Document, Schema } from 'mongoose';
import { ImageObject } from '../types';

export interface ICoach extends Document {
  name: string;
  role: string;
  experience: string;
  specialty: string;
  bio: string;
  image: ImageObject;
  displayOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  socialLinks: {
    facebook?: string;
    instagram?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const coachSchema = new Schema<ICoach>(
  {
    name: {
      type: String,
      required: [true, 'Coach name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    role: {
      type: String,
      trim: true,
      maxlength: [100, 'Role cannot exceed 100 characters']
    },
    experience: {
      type: String,
      required: [true, 'Experience is required'],
      trim: true
    },
    specialty: {
      type: String,
      trim: true
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [1000, 'Bio cannot exceed 1000 characters']
    },
    image: {
      url: { type: String, required: true },
      thumbnail: { type: String, required: true },
      alt: { type: String, default: '' },
      filename: { type: String, required: true }
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    socialLinks: {
      facebook: { type: String, trim: true },
      instagram: { type: String, trim: true }
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
coachSchema.index({ name: 1 });
coachSchema.index({ displayOrder: 1 });
coachSchema.index({ isActive: 1, isFeatured: 1 });

const Coach = mongoose.model<ICoach>('Coach', coachSchema);

export default Coach;
