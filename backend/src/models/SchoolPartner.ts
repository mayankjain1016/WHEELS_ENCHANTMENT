import mongoose, { Document, Schema } from 'mongoose';
import { ImageObject } from '../types';

export interface ISchoolPartner extends Document {
  schoolName: string;
  logo?: ImageObject;
  location: string;
  since: Date;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const schoolPartnerSchema = new Schema<ISchoolPartner>(
  {
    schoolName: {
      type: String,
      required: [true, 'School name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters']
    },
    logo: {
      url: { type: String },
      thumbnail: { type: String },
      alt: { type: String, default: '' },
      filename: { type: String }
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters']
    },
    since: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
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
schoolPartnerSchema.index({ displayOrder: 1 });
schoolPartnerSchema.index({ isActive: 1 });

const SchoolPartner = mongoose.model<ISchoolPartner>('SchoolPartner', schoolPartnerSchema);

export default SchoolPartner;
