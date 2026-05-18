import mongoose, { Document, Schema, Types } from 'mongoose';
import { ImageObject } from '../types';

export interface ISubcategory extends Document {
  name: string;
  slug: string;
  categoryId: Types.ObjectId;
  description: string;
  image: ImageObject;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const subcategorySchema = new Schema<ISubcategory>(
  {
    name: {
      type: String,
      required: [true, 'Subcategory name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    image: {
      url: { type: String },
      thumbnail: { type: String },
      alt: { type: String, default: '' },
      filename: { type: String }
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
subcategorySchema.index({ slug: 1 });
subcategorySchema.index({ categoryId: 1 });
subcategorySchema.index({ displayOrder: 1 });
subcategorySchema.index({ isActive: 1 });

// Compound index for unique slug per category
subcategorySchema.index({ categoryId: 1, slug: 1 }, { unique: true });

const Subcategory = mongoose.model<ISubcategory>('Subcategory', subcategorySchema);

export default Subcategory;
