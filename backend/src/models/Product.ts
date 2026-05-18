import mongoose, { Document, Schema, Types } from 'mongoose';
import { ImageObject } from '../types';

export interface IProduct extends Document {
  name: string;
  slug: string;
  categoryId: Types.ObjectId;
  subcategoryId?: Types.ObjectId;
  description: string;
  specifications: string;
  images: ImageObject[];
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  isInStock: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  displayOrder: number;
  isActive: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters']
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required']
    },
    subcategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Subcategory'
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    specifications: {
      type: String,
      trim: true,
      maxlength: [2000, 'Specifications cannot exceed 2000 characters']
    },
    images: [
      {
        url: { type: String, required: true },
        thumbnail: { type: String, required: true },
        alt: { type: String, default: '' },
        filename: { type: String, required: true }
      }
    ],
    price: {
      type: Number,
      min: [0, 'Price cannot be negative']
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'Compare price cannot be negative']
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative']
    },
    isInStock: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isBestseller: {
      type: Boolean,
      default: false
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    seo: {
      metaTitle: { type: String, trim: true },
      metaDescription: { type: String, trim: true },
      keywords: [{ type: String, trim: true }]
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
productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ categoryId: 1, subcategoryId: 1 });
productSchema.index({ isActive: 1, isFeatured: 1 });
productSchema.index({ displayOrder: 1 });
productSchema.index({ name: 'text', description: 'text' });

// Update isInStock based on stock
productSchema.pre('save', function (next) {
  this.isInStock = this.stock > 0;
  next();
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
